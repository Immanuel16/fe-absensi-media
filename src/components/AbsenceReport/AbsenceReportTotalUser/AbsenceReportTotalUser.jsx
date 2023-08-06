import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatRupiah } from "../../../util/util";

const styles = StyleSheet.create({
  column: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 24,
    position: "relative",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  rowName: {
    width: "10%",
  },
  rowTotal: {
    width: "5%",
  },
  title: {
    fontWeight: "extrabold",
    textAlign: "center",
    textDecoration: "underline",
  },
  content: {
    textAlign: "center",
    textTransform: "capitalize",
  },
  rowTotalPelayanan: {
    position: "absolute",
    bottom: 0,
    right: 10,
    display: "flex",
    flexDirection: "column",
  },
  colTotalPelayanan: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  colTextTotal: {
    fontSize: 20,
    fontWeight: "extrabold",
  },
  colNominalTotal: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 12,
    fontSize: 14,
    paddingLeft: 8,
    paddingRight: 8,
    color: "#333",
  },
  colSubNominalTotal: {
    border: "solid",
    borderBottomWidth: 2,
    paddingBottom: 5,
    paddingLeft: 32,
    paddingRight: 32,
  },
  colTextNominalTotal: {
    textAlign: "center",
    paddingTop: 5,
    fontWeight: "ultrabold",
  },
  wFull: {
    // paddingLeft: 12,
    // paddingRight: 12,
    width: 150,
    textAlign: "center",
    paddingLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  infoRek: {
    paddingLeft: 24,
    marginTop: 6,
  },
  infoTotal: {
    display: "flex",
    flexDirection: "row",
    width: "15%",
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 4,
  },
  infoTotalColText: {
    width: "65%",
  },
  infoTotalCol: {
    width: "35%",
  },
});

const AbsenceReportTotalUser = ({ users, totals }) => (
  <View style={styles.column}>
    {/* header */}
    <View style={styles.row}>
      <View style={styles.rowName}>
        <Text style={styles.title}>Nama</Text>
      </View>
      <View style={styles.rowTotal}>
        <Text style={styles.title}>Total</Text>
      </View>
    </View>

    {/* content */}
    {users.map((user) => (
      <View style={styles.row} key={user.name}>
        <View style={styles.rowName}>
          <Text style={styles.content}>{user.name}</Text>
        </View>
        <View style={styles.rowTotal}>
          <Text style={styles.content}>{user.total}</Text>
        </View>
      </View>
    ))}

    <View style={styles.infoTotal}>
      <View style={styles.infoTotalColText}>
        <Text style={styles.content}></Text>
      </View>
      <View style={styles.infoTotalCol}>
        <Text style={styles.content}>{totals}</Text>
      </View>
    </View>

    {/* Total Pelayanan */}
    <View style={styles.rowTotalPelayanan}>
      <View style={styles.colTotalPelayanan}>
        <Text style={styles.colTextTotal}>Total Pelayanan</Text>
        <View style={styles.colNominalTotal}>
          <View style={styles.colSubNominalTotal}>
            <Text>{totals} x Rp 50.000</Text>
          </View>
          <View style={styles.wFull}>
            <Text style={styles.colTextNominalTotal}>
              {formatRupiah(totals * 50000)}
            </Text>
          </View>
        </View>
      </View>
      {/* info rekening */}
      <Text style={styles.infoRek}>
        Transfer ke Rekening Media 5222691818 a.n. David Ferdinand
      </Text>
    </View>
  </View>
);

export default AbsenceReportTotalUser;
