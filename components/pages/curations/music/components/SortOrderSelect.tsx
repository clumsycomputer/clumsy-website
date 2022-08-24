import {
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import ClickAwayListener from "react-click-away-listener";
import { usePopper } from "react-popper";
import { MusicCurationsPageState, StringPermutation } from "../common/models";
import styles from "./SortOrderSelect.module.scss";

export interface SortOrderSelectProps {
  value: MusicCurationsPageState["sortOrder"];
  onChange: (nextSortOrder: MusicCurationsPageState["sortOrder"]) => void;
}

export function SortOrderSelect(props: SortOrderSelectProps) {
  const { value, onChange } = props;
  const [selectButtonElement, setSelectButtonElement] =
    useState<HTMLDivElement | null>(null);
  const [selectMenu, setSelectMenu] = useState<ReactNode>(null);
  return (
    <Fragment>
      <div
        tabIndex={0}
        className={styles.selectButton}
        ref={setSelectButtonElement}
        onClick={() => {
          setSelectMenu(
            <SortOrderSelectMenu
              value={value}
              onChange={onChange}
              selectButtonElement={selectButtonElement}
              setSelectMenu={setSelectMenu}
            />
          );
        }}
      >
        <div className={styles.buttonLabel}>
          {getSortOrderLabel({
            someSortOrder: value,
          })}
        </div>
        <svg className={styles.buttonArrow} viewBox={"0 0 1 1"}>
          <polygon
            points={"0.2,0.375 0.8,0.375 0.5,0.775"}
            stroke={"black"}
            strokeWidth={0.085}
            strokeLinejoin={"round"}
            fill={"white"}
          />
        </svg>
      </div>
      {selectMenu}
    </Fragment>
  );
}

interface SortOrderSelectMenuProps
  extends Pick<SortOrderSelectProps, "value" | "onChange"> {
  selectButtonElement: HTMLDivElement | null;
  setSelectMenu: Dispatch<SetStateAction<ReactNode>>;
}

function SortOrderSelectMenu(props: SortOrderSelectMenuProps) {
  const { selectButtonElement, setSelectMenu, value, onChange } = props;
  const [selectMenuElement, setSelectMenuElement] =
    useState<HTMLDivElement | null>(null);
  const selectMenuPopper = usePopper(selectButtonElement, selectMenuElement, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [3, -29],
        },
      },
    ],
  });
  const sortOrderList = useMemo<
    StringPermutation<MusicCurationsPageState["sortOrder"]>
  >(
    () => [
      "titleAscending",
      "titleDescending",
      "artistAscending",
      "artistDescending",
      "yearDescending",
      "yearAscending",
    ],
    []
  );
  return (
    <ClickAwayListener
      onClickAway={() => {
        setSelectMenu(null);
      }}
    >
      <div
        className={styles.selectMenuContainer}
        {...selectMenuPopper.attributes.popper}
        style={{ ...selectMenuPopper.styles.popper }}
        ref={setSelectMenuElement}
      >
        {sortOrderList.map((someSortOrder) => (
          <div
            key={someSortOrder}
            className={`${styles.selectMenuItem} ${
              someSortOrder === value ? styles.itemSelected : ""
            }`}
            onClick={() => {
              const nextSortOrder = someSortOrder;
              onChange(nextSortOrder);
              setTimeout(() => {
                setSelectMenu(null);
              });
            }}
          >
            <div className={styles.itemCheck}>✓</div>
            {getSortOrderLabel({
              someSortOrder,
            })}
          </div>
        ))}
      </div>
    </ClickAwayListener>
  );
}

interface GetSortOrderLabelApi {
  someSortOrder: MusicCurationsPageState["sortOrder"];
}

function getSortOrderLabel(api: GetSortOrderLabelApi) {
  const { someSortOrder } = api;
  switch (someSortOrder) {
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
    default:
      throw new Error(`getSortOrderLabel: ${someSortOrder} not handled`);
  }
}
