import { Fragment, useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { usePopper } from "react-popper";
import { MusicCurationsPageState } from "../common/models";
import styles from "./SortOrderSelect.module.scss";

export interface SortOrderSelectProps {
  sortOrder: MusicCurationsPageState["sortOrder"];
  onChange: (nextSortOrder: MusicCurationsPageState["sortOrder"]) => void;
}

export function SortOrderSelect(props: SortOrderSelectProps) {
  const { sortOrder, onChange } = props;
  const [selectMenuOpen, setSelectMenuOpen] = useState(false);
  useEffect(() => {
    setSelectMenuOpen(false);
  }, [sortOrder]);
  const [selectElement, setSelectElement] = useState<HTMLDivElement | null>(
    null
  );
  const [selectMenuElement, setSelectMenuElement] =
    useState<HTMLDivElement | null>(null);
  const selectMenuPopper = usePopper(selectElement, selectMenuElement, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [2, -28],
        },
      },
    ],
  });
  return (
    <Fragment>
      <div
        tabIndex={0}
        ref={setSelectElement}
        style={{
          width: 164,
          borderStyle: "solid",
          borderColor: "black",
          borderWidth: 1.5,
          borderRadius: 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBlock: 1,
          paddingInline: 4,
          fontWeight: 600,
          fontSize: 18,
          fontStyle: "italic",
          cursor: "pointer",
        }}
        onClick={() => {
          setSelectMenuOpen(true);
        }}
      >
        <div style={{ flexGrow: 1 }}>
          {getSortOrderLabel({
            sortOrder,
          })}
        </div>
        <svg
          width={14}
          height={14}
          viewBox={"0 0 1 1"}
          style={{ paddingLeft: 8 }}
        >
          <polygon
            points={"0.2,0.375 0.8,0.375 0.5,0.775"}
            stroke={"black"}
            strokeWidth={0.085}
            strokeLinejoin={"round"}
            fill={"white"}
          />
        </svg>
      </div>
      {selectMenuOpen ? (
        <ClickAwayListener
          onClickAway={() => {
            setSelectMenuOpen(false);
          }}
        >
          <div
            ref={setSelectMenuElement}
            {...selectMenuPopper.attributes.popper}
            style={{
              ...selectMenuPopper.styles.popper,
              backgroundColor: "white",
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: 1.5,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              padding: 8,
              paddingRight: 12,
              paddingTop: 4,
              paddingBottom: 0,
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            {(
              [
                "titleAscending",
                "titleDescending",
                "artistAscending",
                "artistDescending",
                "yearDescending",
                "yearAscending",
              ] as Array<MusicCurationsPageState["sortOrder"]>
            ).map((someSortOrder) => (
              <div
                key={someSortOrder}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 4,
                  cursor: "pointer",
                }}
                onClick={() => {
                  const nextSortOrder = someSortOrder;
                  onChange(nextSortOrder);
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    paddingRight: 8,
                    visibility:
                      someSortOrder === sortOrder ? "visible" : "hidden",
                  }}
                >
                  ✓
                </div>
                {getSortOrderLabel({
                  sortOrder: someSortOrder,
                })}
              </div>
            ))}
          </div>
        </ClickAwayListener>
      ) : null}
    </Fragment>
  );
}

interface GetSortOrderLabelApi
  extends Pick<SortOrderSelectProps, "sortOrder"> {}

function getSortOrderLabel(api: GetSortOrderLabelApi) {
  const { sortOrder } = api;
  switch (sortOrder) {
    case "titleAscending":
      return "title: a → z";
    case "titleDescending":
      return "title: z → a";
    case "artistAscending":
      return "artist: a → z";
    case "artistDescending":
      return "artist: z → a";
    case "yearAscending":
      return "year: oldest";
    case "yearDescending":
      return "year: newest";
  }
}
