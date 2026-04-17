'use client'

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import { Pokin, Pohon } from '../type';

Font.register({ family: 'Times-Roman', src: '/font/times.ttf', fontStyle: 'normal', fontWeight: 'normal' });
Font.registerHyphenationCallback(word => [word]);

interface Modal {
    Data: Pokin[];
    tahun: number;
}

const styles = StyleSheet.create({
    page: {
        paddingVertical: 30, // px-20
        paddingHorizontal: 38, // py-5
        fontFamily: "Times-Roman",
    },
    heading: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 5,
    },
    // --- Gaya Tabel Umum ---
    table: {
        width: 'auto',
        marginBottom: 20,
        borderWidth: 1,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'stretch', // Pastikan sel mengisi tinggi baris
    },
    tableColHeader: {
        padding: 5,
        backgroundColor: 'white', // Latar belakang abu-abu untuk header
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    tableCol: {
        justifyContent: 'flex-start', // Center content vertically
        alignItems: 'flex-start', // Default align text to start
        textAlign: 'left',
        hyphens: 'none',
        padding: 10
    },
    tableColCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    colBorderRight: {
        borderRightWidth: 1,
    },
    colBorderBottom: {
        borderBottom: 1,
    },
    tableCell: {
        fontSize: 8, // Ukuran font untuk konten sel
        textAlign: 'left',
        hyphens: 'none',
    },

    // --- Lebar Kolom Spesifik ---
    col1: { width: '5%' },
    col2: { width: '20%' },
    col3: { width: '30%' },
    col4: { width: '45%' },
});

const DocumentLeaderboardRekin: React.FC<Modal> = ({ Data, tahun }) => {
    return (
        <Document title={`Leaderboard Rekin tahun ${tahun || ""}`}>
            <Page size="A4" style={styles.page}>
                <Text style={styles.heading}>
                    Leaderboard Rekin
                </Text>
                <Text style={styles.heading}>
                    Tahun {tahun || ""}
                </Text>
                <View style={styles.table}>
                    {/* HEADER */}
                    <View style={styles.tableRow}>
                        <View style={[styles.tableColHeader, styles.col1, styles.colBorderRight, styles.colBorderBottom]}>
                            <Text style={styles.tableCell}>No</Text>
                        </View>
                        <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                            <Text style={styles.tableCell}>Perangkat Daerah</Text>
                        </View>
                        <View style={[styles.tableColHeader, styles.col4, styles.colBorderRight, styles.colBorderBottom]}>
                            <Text style={styles.tableCell}>Tema</Text>
                        </View>
                        <View style={[styles.tableColHeader, styles.col2, styles.colBorderBottom]}>
                            <Text style={styles.tableCell}>Persentase Cascading</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableColHeader, styles.col1, styles.colBorderRight, styles.colBorderBottom]}>
                            <Text style={styles.tableCell}>(1)</Text>
                        </View>
                        <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                            <Text style={styles.tableCell}>(2)</Text>
                        </View>
                        <View style={[styles.tableColHeader, styles.col4, styles.colBorderRight, styles.colBorderBottom]}>
                            <Text style={styles.tableCell}>(3)</Text>
                        </View>
                        <View style={[styles.tableColHeader, styles.col2, styles.colBorderBottom]}>
                            <Text style={styles.tableCell}>(4)</Text>
                        </View>
                    </View>
                    {Data.map((data: Pokin, index: number) => (
                        <View key={index} style={styles.tableRow} wrap={false} >
                            {/* NO */}
                            <View style={[styles.tableCol, styles.col1, styles.colBorderRight, styles.colBorderBottom]}>
                                <Text style={styles.tableCell}>{index + 1}</Text>
                            </View>
                            {/* Aksi/kegiatan */}
                            <View style={[styles.tableCol, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                                <Text style={styles.tableCell}>{data.nama_opd || ""}</Text>
                            </View>
                            {/* Indikator */}
                            <View style={[styles.tableCol, styles.col4, styles.colBorderRight, styles.colBorderBottom]}>
                                {data.tematik ?
                                    data.tematik.map((t: Pohon, t_index: number) => (
                                        <Text style={styles.tableCell} key={t_index}>{t_index + 1}.{t.nama || "-"}</Text>
                                    ))
                                    :
                                    <Text style={styles.tableCell}>-</Text>
                                }
                            </View>
                            {/* Target Satuan */}
                            <View style={[styles.tableColCenter, styles.col2, styles.colBorderBottom]}>
                                <Text style={styles.tableCell}>{data.persentase_cascading || 0}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document >
    );
}

export default DocumentLeaderboardRekin;
