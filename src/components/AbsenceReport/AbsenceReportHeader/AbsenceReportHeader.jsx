import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import logo from "../../../assets/img/logo-gbi.jpeg";

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 16,
  },
  reportTitle: {
    color: "#333",
    letterSpacing: 1.5,
    fontSize: 28,
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: 600,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 4,
  },
});

const AbsenceReportHeader = ({ title }) => (
  <View style={styles.titleContainer}>
    <View style={styles.logoContainer}>
      <Image src={logo} style={styles.logo} />
    </View>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
);

export default AbsenceReportHeader;
