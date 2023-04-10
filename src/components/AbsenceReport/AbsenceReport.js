import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import AbsenceReportHeader from "./AbsenceReportHeader/AbsenceReportHeader";
import AbsenceReportTable from "./AbsenceReportTable/AbsenceReportTable";
import AbsenceReportTotalUser from "./AbsenceReportTotalUser/AbsenceReportTotalUser";
// import logo

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 84,
    height: 70,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const AbsenceReport = ({ absence, users, totalMinistry, month }) => (
  <Document>
    <Page size="A3" style={styles.page}>
      <AbsenceReportHeader title={`Rekap PK Media ${month}`} />
      <AbsenceReportTable data={absence} />
      <AbsenceReportTotalUser users={users} totals={totalMinistry} />
    </Page>
  </Document>
);

export default AbsenceReport;
