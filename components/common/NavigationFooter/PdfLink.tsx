import Link from "next/link";
import pdfLinkStyles from "./PdfLink.module.scss";

export interface PdfLinkProps {
  pdfHref: string;
}

export function PdfLink(props: PdfLinkProps) {
  const { pdfHref } = props;
  return (
    <div className={pdfLinkStyles.linkContainer}>
      <Link href={pdfHref}>
        <a className={pdfLinkStyles.pdfLink}>view pdf</a>
      </Link>
    </div>
  );
}
