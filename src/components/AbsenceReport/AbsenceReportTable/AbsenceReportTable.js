import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { convertDate, dateFormat } from "../../../util/util";

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "column",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableRowHeader: {
    margin: "auto",
    flexDirection: "row",
    color: "#daa520",
    fontWeight: 700,
  },
  tableCol: {
    width: "8.33%",
    // padding: 9.38,
    paddingBottom: 6,
    paddingTop: 6,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColTanggal: {
    width: "10.7%",
    paddingBottom: 6,
    paddingTop: 6,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColRemarks: {
    width: "6%",
    paddingBottom: 6,
    paddingTop: 6,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    // marginTop: 5,
    fontSize: 10,
    textTransform: "capitalize",
  },
});
const AbsenceReportTable = ({ data }) => {
  const tables = (
    <View style={styles.table}>
      {/* table header */}
      <View style={styles.tableRowHeader}>
        <View style={styles.tableColTanggal}>
          <Text style={styles.tableCell}>Tanggal</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Com 1</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Com 2</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Lighting</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Camera 1</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Camera 2</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Camera 3</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Switcher</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Photo</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Soundman 1</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Soundman 2</Text>
        </View>
        <View style={styles.tableColRemarks}>
          <Text style={styles.tableCell}>Remarks</Text>
        </View>
      </View>
      {/* table content */}
      {data.map((d) => (
        <View style={styles.tableRow} key={d.id}>
          <View style={styles.tableColTanggal}>
            <Text style={styles.tableCell}>
              {convertDate(d.tanggal, dateFormat.input) || "-"}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{d.kom1 || "-"}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{d.kom2 || "-"}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{d.lighting || "-"}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{d.cam1 || "-"}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{d.cam2 || "-"}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{d.cam3 || "-"}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{d.switcher || "-"}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{d.photo || "-"}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{d.sound1 || "-"}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{d.sound2 || "-"}</Text>
          </View>
          <View style={styles.tableColRemarks}>
            <Text style={styles.tableCell}>{d.ir || "-"}</Text>
          </View>
        </View>
      ))}
    </View>
  );
  return <>{tables}</>;
};

export default AbsenceReportTable;
