'use client'

import { useEffect, useState } from 'react';
import {
  TbBook, TbApps, TbChecklist, TbShoppingCartDollar, TbRefreshAlert,
  TbLogout, TbBook2, TbBulb, TbFileAlert, TbTooltip, TbBinaryTree, TbBuildingFortress,
  TbBuildingCommunity, TbDatabaseCog, TbHome, TbFileDelta, TbFile3D,
  TbCircleArrowLeftFilled, TbBadges, TbBuilding, TbChevronRight,
  TbBuildingEstate, TbFileChart, TbFileDots, TbFileCode, TbFileCode2, TbUsers, TbArrowUpFromArc,
  TbUser, TbHexagonLetterR, TbBinaryTree2, TbTarget, TbMapPin, TbChartBar, TbCalendarShare,
  TbMessageReport, TbCalendar, TbHexagonLetterV, TbHexagonLetterM, TbClipboardText, TbZoomExclamation,
  TbFileAnalytics, TbListDetails, TbCalendarTime,
  TbAlertTriangle,
  TbAlertCircle, TbHexagonLetterC, TbHexagonLetterI, TbHexagonLetterO,
  TbDatabasePlus,
  TbCalendarPlus,
  TbDeviceImacDollar
} from "react-icons/tb";
import Image from 'next/image';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import "@/app/globals.css";
import { logout, getUser } from '../lib/Cookie';
import { BrandingProvider, useBrandingContext } from '@/context/BrandingContext';
import { Inter } from 'next/font/google';

interface SidebarProps {
  isOpen: boolean | null;
  isZoomed: boolean | null;
  toggleSidebar: () => void;
}

// TODO: REFACTOR SIDEBAR LOGIC
export const Sidebar = ({ isZoomed, isOpen, toggleSidebar }: SidebarProps) => {

  const [User, setUser] = useState<any>(null);
  const { id } = useParams();
  const url = usePathname();

  const { branding } = useBrandingContext();

  //state menu, submenu, subsmenu
  const [Dashboard, setDashboard] = useState<boolean | null>(null);
  const [DataMaster, setDataMaster] = useState<boolean | null>(null);
  const [DataMasterOpd, setDataMasterOpd] = useState<boolean | null>(null);
  // DATA MASTER
  const [MasterOPD, setMasterOPD] = useState<boolean | null>(null);
  const [KelompokAnggaran, setKelompokAnggaran] = useState<boolean | null>(null);
  const [MasterPegawai, setMasterPegawai] = useState<boolean | null>(null);
  const [MasterPeriode, setMasterPeriode] = useState<boolean | null>(null);
  const [LevelPohon, setLevelPohon] = useState<boolean | null>(null);
  const [MasterJabatan, setMasterJabatan] = useState<boolean | null>(null);
  const [MasterUser, setMasterUser] = useState<boolean | null>(null);
  const [MasterRole, setMasterRole] = useState<boolean | null>(null);
  const [MasterUsulanPemda, setMasterUsulanPemda] = useState<boolean | null>(null);
  const [MasterProgramKegiatan, setMasterProgramKegiatan] = useState<boolean | null>(null);
  const [MasterUrusan, setMasterUrusan] = useState<boolean | null>(null);
  const [MasterBidangUrusan, setMasterBidangUrusan] = useState<boolean | null>(null);
  const [MasterProgram, setMasterProgram] = useState<boolean | null>(null);
  const [MasterKegiatan, setMasterKegiatan] = useState<boolean | null>(null);
  const [MasterSubKegiatan, setMasterSubKegiatan] = useState<boolean | null>(null);
  const [MasterLembaga, setMasterLembaga] = useState<boolean | null>(null);
  // DATA MASTER OPD
  const [UserOpd, setUserOpd] = useState<boolean | null>(null);
  const [SubKegiatanOpd, setSubKegiatanOpd] = useState<boolean | null>(null);
  // PERENCANAAN PEMDA
  const [PerencanaanKota, setPerencanaanKota] = useState<boolean | null>(null);
  const [IsuStrategisPemda, setIsuStrategisPemda] = useState<boolean | null>(null);
  const [CSF, setCSF] = useState<boolean | null>(null);
  const [Outcome, setOutcome] = useState<boolean | null>(null);
  const [Intermediate, setIntermediate] = useState<boolean | null>(null);
  const [TematikKota, setTematikKota] = useState<boolean | null>(null);
  const [SubTematik, setSubTematik] = useState<boolean | null>(null);
  const [KotaPohonKinerjaKota, setKotaPohonKinerjaKota] = useState<boolean | null>(null);
  const [RPJMD, setRPJMD] = useState<boolean | null>(null);
  const [Visi, setVisi] = useState<boolean | null>(null);
  const [Misi, setMisi] = useState<boolean | null>(null);
  const [TujuanPemda, setTujuanPemda] = useState<boolean | null>(null);
  const [SasaranPemda, setSasaranPemda] = useState<boolean | null>(null);
  const [IKU, setIKU] = useState<boolean | null>(null);
  // PERENCANAAN OPD
  const [PerencanaanOPD, setPerencanaanOPD] = useState<boolean | null>(null);
  const [pohonKinerjaOpd, setPohonKinerjaOpd] = useState<boolean | null>(null);
  const [PohonCascadingOpd, setPohonCascadingOpd] = useState<boolean | null>(null);
  const [Renstra, setRenstra] = useState<boolean | null>(null);
  const [TujuanOpd, setTujuanOpd] = useState<boolean | null>(null);
  const [SasaranOpd, setSasaranOpd] = useState<boolean | null>(null);
  const [IKUOpd, setIKUOpd] = useState<boolean | null>(null);
  const [RencanaAksiOpd, setRencanaAksiOpd] = useState<boolean | null>(null);
  const [PermasalahanOpd, setPermasalahanOpd] = useState<boolean | null>(null);
  const [Permasalahan, setPermasalahan] = useState<boolean | null>(null);
  const [IsuStrategis, setIsuStrategis] = useState<boolean | null>(null);
  const [MasterUsulanOpd, setMasterUsulanOpd] = useState<boolean | null>(null);
  const [MasterUsulanMusrenbang, setMasterUsulanMusrenbang] = useState<boolean | null>(null);
  const [MasterUsulanPokir, setMasterUsulanPokir] = useState<boolean | null>(null);
  const [MasterUsulanMandatori, setMasterUsulanMandatori] = useState<boolean | null>(null);
  const [MasterUsulanInisiatif, setMasterUsulanInisiatif] = useState<boolean | null>(null);
  const [Perencanaan, setPerencanaan] = useState<boolean | null>(null);
  const [UsulanLaporan, setUsulanLaporan] = useState<boolean | null>(null);
  const [Musrenbang, setMusrenbang] = useState<boolean | null>(null);
  const [PokokPikiran, setPokokPikiran] = useState<boolean | null>(null);
  const [Mandatori, setMandatori] = useState<boolean | null>(null);
  const [Inisiatif, setInisiatif] = useState<boolean | null>(null);
  const [RencanaKinerja, setRencanaKinerja] = useState<boolean | null>(null);
  const [PohonCascading, setPohonCascading] = useState<boolean | null>(null);
  const [PerencanaanManajemenResiko, setPerencanaanManajemenResiko] = useState<boolean | null>(null);
  // LABEL LAPORAN
  const [Laporan, setLaporan] = useState<boolean | null>(null);
  // LABEL LAPORAN USULAN
  const [LaporanUsulan, setLaporanUsulan] = useState<boolean | null>(null);
  // LAPORAN USULAN
  const [LaporanMusrenbang, setLaporanMusrenbang] = useState<boolean | null>(null);
  const [LaporanPokokPikiran, setLaporanPokokPikiran] = useState<boolean | null>(null);
  const [LaporanMandatori, setLaporanMandatori] = useState<boolean | null>(null);
  const [LaporanInisiatif, setLaporanInisiatif] = useState<boolean | null>(null);
  const [SPIP, setSPIP] = useState<boolean | null>(null);
  // LABEL LAPORAN REVIEW POKIN
  const [Review, setReview] = useState<boolean | null>(null);
  // LAPORAN REVIEW POKIN
  const [ReviewPemda, setReviewPemda] = useState<boolean | null>(null);
  const [ReviewOpd, setReviewOpd] = useState<boolean | null>(null);
  // LABEL RENSTRA OPD
  const [RenstraView, setRenstraView] = useState<boolean | null>(null);
  // RENSTRA OPD
  const [TujuanOpdView, setTujuanOpdView] = useState<boolean | null>(null);
  const [SasaranOpdView, setSasaranOpdView] = useState<boolean | null>(null);
  const [IkuOpdView, setIkuOpdView] = useState<boolean | null>(null);


  const [ManajemenResiko, setManajemenResiko] = useState<boolean | null>(null);
  const [Inovasi, setInovasi] = useState<boolean | null>(null);
  const [OpdDiTematik, setOpdDiTematik] = useState<boolean | null>(null);
  const [RencanaKinerjaKAK, setRencanaKinerjaKAK] = useState<boolean | null>(null);
  const [RincianBelanja, setRincianBelanja] = useState<boolean | null>(null);
  const [LaporanRincianBelanja, setLaporanRincianBelanja] = useState<boolean | null>(null);
  const [LaporanRenstra, setLaporanRenstra] = useState<boolean>(false);
  const [LaporanCascadingOpd, setLaporanCascadingOpd] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = getUser();
    if (fetchUser) {
      setUser(fetchUser.user);
    }
  }, [])

  useEffect(() => {
    if (url == "/") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      // setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(true);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    //DATA MASTER
    if (url == "/DataMaster/masteropd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(true);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/kelompokanggaran") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(true);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masterpegawai") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(true);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masterperiode") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(true);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masterusulan") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(true);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    //Master Program Kegiatan
    if (url == "/DataMaster/masterprogramkegiatan/bidangurusan") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(true);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(true);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masterprogramkegiatan/kegiatan") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(true);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(true);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masterprogramkegiatan/program") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(true);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(true);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masterprogramkegiatan/subkegiatan") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(true);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(true);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masterprogramkegiatan/urusan") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(true);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(true);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masterjabatan") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(true);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masterlembaga") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(true);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masteruser") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(true);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/DataMaster/masterrole") {
      // SLIDE MENU
      // super_admin
      setDataMaster(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(true);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    //PERENCANAAN KOTA
    if (url == "/pohonkinerjapemda") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(true);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(true);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/tematikpemda") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(true);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(true);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/CSF" || url == '/CSF/tambah' || url == `/CSF/${id}`) {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(true);
      setIsuStrategisPemda(true);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(true);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/outcome" || url == '/outcome/tambah' || url == `/outcome/${id}`) {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(true);
      setIsuStrategisPemda(true);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(true);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/intermediate" || url == '/intermediate/tambah' || url == `/intermediate/${id}`) {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(true);
      setIsuStrategisPemda(true);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(true);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/visi") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(true);
      setIsuStrategisPemda(false);
      setRPJMD(true);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(true);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/misi") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(true);
      setIsuStrategisPemda(false);
      setRPJMD(true);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(true);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/tujuanpemda") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(true);
      setIsuStrategisPemda(false);
      setRPJMD(true);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(true);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/sasaranpemda") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(true);
      setIsuStrategisPemda(false);
      setRPJMD(true);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(true);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/ikupemda") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(true);
      setIsuStrategisPemda(false);
      setRPJMD(true);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(true);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      //Renstra
      setRencanaAksiOpd(false);
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    //PERENCANAAN OPD
    if (url == "/tujuanopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(true);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(true);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/sasaranopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(true);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(true);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/ikuopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(true);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(true);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/rencanaaksiopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(true);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/permasalahanopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(true);
      setPermasalahan(true);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/isustrategis") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(true);
      setPermasalahan(false);
      setIsuStrategis(true);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/subkegiatanopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(true);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(true);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/MasterUsulan/mastermusrenbang") {
      setDashboard(false);
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterProgramKegiatan(false);
      setMasterBidangUrusan(false);
      setMasterKegiatan(false);
      setMasterProgram(false);
      setMasterSubKegiatan(false);
      setMasterUrusan(false);
      setMasterJabatan(false);
      setMasterLembaga(false);
      setMasterRole(false);
      setMasterUser(false);
      setPerencanaanKota(false);
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setSubTematik(false);
      setKotaPohonKinerjaKota(false);
      setOpdDiTematik(false);
      setPerencanaanOPD(true);
      setMasterUsulanOpd(true);
      setRincianBelanja(false);
      setMasterUsulanMusrenbang(true);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setLaporan(false);
      setUsulanLaporan(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setManajemenResiko(false);
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/MasterUsulan/masterpokokpikiran") {
      setDashboard(false);
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterProgramKegiatan(false);
      setMasterBidangUrusan(false);
      setMasterKegiatan(false);
      setMasterProgram(false);
      setMasterSubKegiatan(false);
      setMasterUrusan(false);
      setMasterJabatan(false);
      setMasterLembaga(false);
      setMasterRole(false);
      setMasterUser(false);
      setPerencanaanKota(false);
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setSubTematik(false);
      setKotaPohonKinerjaKota(false);
      setOpdDiTematik(false);
      setPerencanaanOPD(true);
      setMasterUsulanOpd(true);
      setRincianBelanja(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(true);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setLaporan(false);
      setUsulanLaporan(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setManajemenResiko(false);
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/MasterUsulan/mastermandatori") {
      setDashboard(false);
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterProgramKegiatan(false);
      setMasterBidangUrusan(false);
      setMasterKegiatan(false);
      setMasterProgram(false);
      setMasterSubKegiatan(false);
      setMasterUrusan(false);
      setMasterJabatan(false);
      setMasterLembaga(false);
      setMasterRole(false);
      setMasterUser(false);
      setPerencanaanKota(false);
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setSubTematik(false);
      setKotaPohonKinerjaKota(false);
      setOpdDiTematik(false);
      setPerencanaanOPD(true);
      setMasterUsulanOpd(true);
      setRincianBelanja(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(true);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setLaporan(false);
      setUsulanLaporan(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setManajemenResiko(false);
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/MasterUsulan/masterinisiatif") {
      setDashboard(false);
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterProgramKegiatan(false);
      setMasterBidangUrusan(false);
      setMasterKegiatan(false);
      setMasterProgram(false);
      setMasterSubKegiatan(false);
      setMasterUrusan(false);
      setMasterJabatan(false);
      setMasterLembaga(false);
      setMasterRole(false);
      setMasterUser(false);
      setPerencanaanKota(false);
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setSubTematik(false);
      setKotaPohonKinerjaKota(false);
      setOpdDiTematik(false);
      setPerencanaanOPD(true);
      setMasterUsulanOpd(true);
      setRincianBelanja(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(true);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setLaporan(false);
      setUsulanLaporan(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setManajemenResiko(false);
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/pohonkinerjaopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(true);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/pohoncascadingopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(true);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(true);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/useropd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(true);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(true);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (
      url == "/rencanakinerja" ||
      url == `/rencanakinerja/${id}/edit` ||
      url == `/rencanakinerja/${id}/tambah` ||
      url == `/rencanakinerja/manual_ik/${id}` ||
      url == `/rencanakinerja/${id}`
    ) {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(true);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(true);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/rincianbelanja") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(true);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPerencanaanManajemenResiko(false);
      setRincianBelanja(true);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/musrenbang") {
      setDashboard(false);
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterProgramKegiatan(false);
      setMasterBidangUrusan(false);
      setMasterKegiatan(false);
      setMasterProgram(false);
      setMasterSubKegiatan(false);
      setMasterUrusan(false);
      setMasterJabatan(false);
      setMasterLembaga(false);
      setMasterRole(false);
      setMasterUser(false);
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setSubTematik(false);
      setPerencanaanKota(false);
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setOpdDiTematik(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setRincianBelanja(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setPerencanaan(true);
      setUsulanLaporan(true);
      setMusrenbang(true);
      setPokokPikiran(false);
      setMandatori(false);
      setInisiatif(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
      setManajemenResiko(false);
      setRencanaKinerja(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
      setLaporan(false);
    }
    if (url == "/pokokpikiran") {
      setDashboard(false);
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterProgramKegiatan(false);
      setMasterBidangUrusan(false);
      setMasterKegiatan(false);
      setMasterProgram(false);
      setMasterSubKegiatan(false);
      setMasterUrusan(false);
      setMasterJabatan(false);
      setMasterLembaga(false);
      setMasterRole(false);
      setMasterUser(false);
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setSubTematik(false);
      setPerencanaanKota(true);
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setOpdDiTematik(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setRincianBelanja(false);
      setUserOpd(false);
      setPerencanaan(true);
      setUsulanLaporan(true);
      setMusrenbang(false);
      setPokokPikiran(true);
      setMandatori(false);
      setInisiatif(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
      setManajemenResiko(false);
      setRencanaKinerja(false);
    }
    if (url == "/mandatori") {
      setDashboard(false);
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterProgramKegiatan(false);
      setMasterBidangUrusan(false);
      setMasterKegiatan(false);
      setMasterProgram(false);
      setMasterSubKegiatan(false);
      setMasterUrusan(false);
      setMasterJabatan(false);
      setMasterLembaga(false);
      setMasterRole(false);
      setMasterUser(false);
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setSubTematik(false);
      setPerencanaanKota(true);
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setOpdDiTematik(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setRincianBelanja(false);
      setUserOpd(false);
      setUsulanLaporan(true);
      setPerencanaan(true);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(true);
      setInisiatif(false);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
      setManajemenResiko(false);
      setRencanaKinerja(false);
    }
    if (url == "/manajemenresiko") {
      setDashboard(false);
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterProgramKegiatan(false);
      setMasterBidangUrusan(false);
      setMasterKegiatan(false);
      setMasterProgram(false);
      setMasterSubKegiatan(false);
      setMasterUrusan(false);
      setMasterJabatan(false);
      setMasterLembaga(false);
      setMasterRole(false);
      setMasterUser(false);
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setSubTematik(false);
      setOpdDiTematik(false);
      setPerencanaanKota(true);
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setMasterUsulanMusrenbang(false);
      setMasterUsulanMandatori(false);
      setMasterUsulanPokir(false);
      setMasterUsulanInisiatif(false);
      setTujuanOpd(false);
      setPohonKinerjaOpd(false);
      setUserOpd(false);
      setUsulanLaporan(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
      setRencanaKinerja(false);
      setRincianBelanja(false);
      setMusrenbang(false);
      setPokokPikiran(false);
      setMandatori(false);
      setManajemenResiko(true);
      setPohonCascading(false);
      setPohonCascadingOpd(false);
    }
    if (url == "/listopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(true);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(true);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/reviewpemda") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(true);
      setLaporanUsulan(false);
      setReview(true);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(true);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/reviewopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(true);
      setLaporanUsulan(false);
      setReview(true);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(true);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/tujuanopdview") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(true);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(true);
      setTujuanOpdView(true);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/sasaranopdview") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(true);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(true);
      setTujuanOpdView(false);
      setSasaranOpdView(true);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/ikuopdview") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(true);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(true);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(true);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/laporanrenstra") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(true);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(true);
      setLaporanCascadingOpd(false);
    }
    if (url == "/pohoncascading") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(true);
      setUsulanLaporan(false);
      setLaporan(false);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(true);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/laporanrincianbelanja") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(true);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(true)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(false);
    }
    if (url == "/laporancascadingopd") {
      // SLIDE MENU
      // super_admin
      setDataMaster(false);
      setDataMasterOpd(false);
      setMasterProgramKegiatan(false);
      setPerencanaanKota(false);
      setIsuStrategisPemda(false);
      setRPJMD(false);
      // admin_opd
      setPerencanaanOPD(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      setRenstra(false);
      // asn
      setPerencanaan(false);
      setUsulanLaporan(false);
      setLaporan(true);
      setLaporanUsulan(false);
      setReview(false);

      // HALAMAN
      setDashboard(false);
      // data master
      setMasterOPD(false);
      setKelompokAnggaran(false);
      setMasterPegawai(false);
      setMasterPeriode(false);
      setLevelPohon(false);
      setMasterJabatan(false);
      setMasterUsulanPemda(false);
      // masterprogramkegiatan
      setMasterUrusan(false);
      setMasterBidangUrusan(false);
      setMasterProgram(false);
      setMasterKegiatan(false);
      setMasterSubKegiatan(false);
      setMasterLembaga(false);
      setMasterUser(false);
      setMasterRole(false);
      // perencanaan pemda
      setTematikKota(false);
      setCSF(false);
      setOutcome(false);
      setIntermediate(false);
      setKotaPohonKinerjaKota(false);
      // RPJMD
      setVisi(false);
      setMisi(false);
      setTujuanPemda(false);
      setSasaranPemda(false);
      setIKU(false);
      // perencanaan opd
      setPohonKinerjaOpd(false);
      setPohonCascadingOpd(false);
      setPermasalahanOpd(false);
      setPermasalahan(false);
      setIsuStrategis(false);
      setUserOpd(false);
      setRencanaAksiOpd(false);
      //Renstra
      setTujuanOpd(false);
      setSasaranOpd(false);
      setIKUOpd(false);
      setSubKegiatanOpd(false);
      setMasterUsulanOpd(false);
      //perencanaan asn
      setRencanaKinerja(false);
      setPohonCascading(false);
      setRincianBelanja(false);
      setPerencanaanManajemenResiko(false);
      //laporan
      setOpdDiTematik(false);
      setReviewPemda(false);
      setReviewOpd(false);
      setLaporanMusrenbang(false);
      setLaporanPokokPikiran(false);
      setLaporanMandatori(false);
      setLaporanInisiatif(false);
      setRenstraView(false);
      setTujuanOpdView(false);
      setSasaranOpdView(false);
      setIkuOpdView(false);
      setManajemenResiko(false);
      setInovasi(false);
      setRencanaKinerjaKAK(false);
      setLaporanRincianBelanja(false)
      setLaporanRenstra(false);
      setLaporanCascadingOpd(true);
    }
  }, [url, id]);

  return (
    <div className="flex">
      {/* tombol sidebar zoom 150% */}
      {isZoomed && (
        <div
          className={`fixed top-1 bg-gradient-to-bl from-[#182C4E] to-[#17212D] border border-white p-2 cursor-pointer duration-200 text-white rounded-md z-50 ${!isOpen ? 'rotate-180 ' : 'left-[13rem]'}`}
          onClick={() => toggleSidebar()}
        >
          <TbCircleArrowLeftFilled />
        </div>
      )}

      {/* awal sidebar */}
      <div className={`bg-gradient-to-bl from-[#182C4E] to-[#17212D] overflow-y-auto text-white h-full ${isOpen ? 'w-64 py-5 px-3' : 'w-0'} duration-300 fixed custom-scrollbar`}>
        <div className="flex items-center justify-center">
          <Image
            className="mb-3 transition-all duration-300 ease-in-out"
            src={branding.logo}
            // src="/universal.png"
            alt="logo"
            width={!isZoomed ? 80 : 80}
            height={!isZoomed ? 80 : 80}
          />
        </div>
        {/* tombol sidebar default */}
        {!isZoomed && (
          <div
            className={`fixed top-1 p-2 mt-5 cursor-pointer border border-white text-white duration-200 rounded-md z-50 hover:bg-white hover:text-[#182C4E] ${!isOpen ? 'rotate-180 bg-gray-800' : 'left-[13rem]'}`}
            onClick={toggleSidebar}
          >
            <TbCircleArrowLeftFilled />
          </div>
        )}
        {/* header sidebar */}
        <div className="flex gap-x-4 items-center">
          <div className={`flex flex-wrap justify-center text-white text-center text-lg ${!isOpen && 'scale-0'} duration-300`}>
            <h2 className='font-bold uppercase'>
              {branding.title}
            </h2>
            <h3 className='font-thin text-lg'>{branding.client}</h3>
          </div>
        </div>

        <ul className="pt-6">
          {/* LABEL DASHBOARD */}
          <Link href="/">
            <li className={`flex items-center font-medium gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ${Dashboard ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
              <TbHome className="text-xl" />
              <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Dashboard</span>
            </li>
          </Link>



          {/* LABEL DATA MASTER */}
          {User?.roles == 'super_admin' &&
            <li
              className={`flex justify-between items-center font-medium gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
              onClick={() => setDataMaster(DataMaster ? false : true)}
            >
              <div className="flex items-center gap-2">
                <TbDatabaseCog className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Data Master</span>
              </div>
              <TbChevronRight className={`transition-all duration-200 ease-in-out ${DataMaster ? "rotate-90" : ""}`} />
            </li>
          }
          {/* SUB MENU DATA MASTER */}
          {User?.roles == 'super_admin' &&
            <div className={`transition-all duration-300 ease-in-out ${DataMaster ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <Link href="/DataMaster/masterlembaga">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterLembaga ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBuildingEstate className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Master Lembaga</span>
                </li>
              </Link>
              {/* <Link href="/DataMaster/kelompokanggaran">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${KelompokAnggaran ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbCalendarTime className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} text-sm origin-left duration-200`}>Kelompok Anggaran</span>
                </li>
              </Link> */}
              <Link href="/DataMaster/masteropd">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterOPD ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBuilding className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Master OPD</span>
                </li>
              </Link>
              <Link href="/DataMaster/masterrole">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterRole ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbHexagonLetterR className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Master Role</span>
                </li>
              </Link>
              <Link href="/DataMaster/masterpegawai">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterPegawai ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbUsers className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Master Pegawai</span>
                </li>
              </Link>
              <Link href="/DataMaster/masterperiode">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterPeriode ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbCalendar className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Master Periode</span>
                </li>
              </Link>
              <Link href="/DataMaster/masteruser">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterUser ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbUser className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Master User</span>
                </li>
              </Link>
              <Link href="/DataMaster/masterjabatan">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterJabatan ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBadges className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Master Jabatan</span>
                </li>
              </Link>
              <Link href="/DataMaster/masterusulan">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${LevelPohon ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbApps className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Master Usulan</span>
                </li>
              </Link>
              {/* LABEL MASTER PROGRAM KEGIATAN */}
              <li
                className={`flex justify-between items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-slate-500`}
                onClick={() => setMasterProgramKegiatan(MasterProgramKegiatan ? false : true)}
              >
                <div className="flex items-center gap-2">
                  <TbFile3D className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} text-sm origin-left duration-200`}>Program Kegiatan</span>
                </div>
                <TbChevronRight className={`transition-all duration-200 ease-in-out ${MasterProgramKegiatan ? "rotate-90" : ""}`} />
              </li>
              {/* DATA MASTER PROGRAM KEGIATAN */}
              <div className={`transition-all duration-300 ease-in-out ${MasterProgramKegiatan ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <Link href="/DataMaster/masterprogramkegiatan/urusan">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterUrusan ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbFileChart className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Urusan</span>
                  </li>
                </Link>
                <Link href="/DataMaster/masterprogramkegiatan/bidangurusan">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterBidangUrusan ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbFileDelta className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Bidang Urusan</span>
                  </li>
                </Link>
                <Link href="/DataMaster/masterprogramkegiatan/program">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterProgram ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbFileDots className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Program</span>
                  </li>
                </Link>
                <Link href="/DataMaster/masterprogramkegiatan/kegiatan">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterKegiatan ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbFileCode className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Kegiatan</span>
                  </li>
                </Link>
                <Link href="/DataMaster/masterprogramkegiatan/subkegiatan">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out ${MasterSubKegiatan ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbFileCode2 className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Sub Kegiatan</span>
                  </li>
                </Link>
              </div>
            </div>
          }


          {/* LABEL DATA MASTER OPD */}
          {(User?.roles == 'super_admin' || User?.roles == 'admin_opd' || User?.roles == 'reviewer') &&
            <li
              className={`flex justify-between items-center font-medium gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
              onClick={() => setDataMasterOpd(DataMasterOpd ? false : true)}
            >
              <div className="flex items-center gap-2">
                <TbDatabasePlus className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Data Master OPD</span>
              </div>
              <TbChevronRight className={`transition-all duration-200 ease-in-out ${DataMasterOpd ? "rotate-90" : ""}`} />
            </li>
          }
          {/* SUB MENU DATA MASTER OPD */}
          {(User?.roles == 'super_admin' || User?.roles == 'admin_opd' || User?.roles == 'reviewer') &&
            <div className={`transition-all duration-300 ease-in-out ${DataMasterOpd ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <Link href="/useropd">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${UserOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbUser className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>User OPD</span>
                </li>
              </Link>
              <Link href="/subkegiatanopd">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${SubKegiatanOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbFileCode2 className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Sub Kegiatan OPD</span>
                </li>
              </Link>
            </div>
          }



          {/* LABEL PERENCANAAN PEMDA */}
          {(User?.roles == 'super_admin' || User?.roles == 'reviewer') &&
            <>
              <li
                className={`flex justify-between font-medium items-center gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
                onClick={() => setPerencanaanKota(PerencanaanKota ? false : true)}
              >
                <div className="flex items-center gap-2">
                  <TbBuildingFortress className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} text-sm origin-left duration-200`}>Perencanaan Pemda</span>
                </div>
                <TbChevronRight className={`transition-all duration-200 ease-in-out ${PerencanaanKota ? "rotate-90" : ""}`} />
              </li>
              {/* SUB MENU PERENCANAAN PEMDA */}
              {User?.roles != 'reviewer' ?
                <div className={`transition-all duration-300 ease-in-out ${PerencanaanKota ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                  {/* <Link href="/tematikpemda">
                    <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${TematikKota ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                      <TbArrowUpFromArc className="text-xl" />
                      <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Tematik Pemda</span>
                    </li>
                  </Link> */}
                  {/* LABEL Isu Strategis Pemda */}
                  <li
                    className={`flex justify-between items-center font-medium gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
                    onClick={() => setIsuStrategisPemda(IsuStrategisPemda ? false : true)}
                  >
                    <div className="flex items-center gap-2">
                      <TbArrowUpFromArc className="text-xl" />
                      <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Isu Strategis</span>
                    </div>
                    <TbChevronRight className={`transition-all duration-200 ease-in-out ${IsuStrategisPemda ? "rotate-90" : ""}`} />
                  </li>
                  {/* SUB MENU Isu Strategis Pemda */}
                  <div className={`transition-all duration-300 ease-in-out ${IsuStrategisPemda ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <Link href="/CSF">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${CSF ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbHexagonLetterC className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>CSF</span>
                      </li>
                    </Link>
                    <Link href="/outcome">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Outcome ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbHexagonLetterO className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Outcome</span>
                      </li>
                    </Link>
                    <Link href="/intermediate">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Intermediate ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbHexagonLetterI className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Intermediate</span>
                      </li>
                    </Link>
                  </div>
                  <Link href="/pohonkinerjapemda">
                    <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${KotaPohonKinerjaKota ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                      <TbBinaryTree className="text-xl" />
                      <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Kinerja Pemda</span>
                    </li>
                  </Link>
                  {/* LABEL RPJMD */}
                  <li
                    className={`flex justify-between items-center font-medium gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
                    onClick={() => setRPJMD(RPJMD ? false : true)}
                  >
                    <div className="flex items-center gap-2">
                      <TbCalendarShare className="text-xl" />
                      <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>RPJMD</span>
                    </div>
                    <TbChevronRight className={`transition-all duration-200 ease-in-out ${RPJMD ? "rotate-90" : ""}`} />
                  </li>
                  {/* SUB MENU RPJMD */}
                  <div className={`transition-all duration-300 ease-in-out ${RPJMD ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <Link href="/visi">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Visi ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbHexagonLetterV className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Visi</span>
                      </li>
                    </Link>
                    <Link href="/misi">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Misi ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbHexagonLetterM className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Misi</span>
                      </li>
                    </Link>
                    <Link href="/tujuanpemda">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${TujuanPemda ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbMapPin className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Tujuan Pemda</span>
                      </li>
                    </Link>
                    <Link href="/sasaranpemda">
                      <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${SasaranPemda ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbTarget className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Sasaran Pemda</span>
                      </li>
                    </Link>
                    <Link href="/ikupemda">
                      <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${IKU ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                        <TbChartBar className="text-xl" />
                        <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>IKU</span>
                      </li>
                    </Link>
                  </div>
                </div>
                :
                <div className={`transition-all duration-300 ease-in-out ${PerencanaanKota ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                  <Link href="/pohonkinerjapemda">
                    <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${KotaPohonKinerjaKota ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                      <TbBinaryTree className="text-xl" />
                      <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Kinerja Pemda</span>
                    </li>
                  </Link>
                </div>
              }
            </>
          }



          {/* LABEL PERENCANAAN OPD */}
          {(User?.roles == 'super_admin' || User?.roles == 'admin_opd' || User?.roles == 'reviewer') &&
            <li
              className={`flex justify-between font-medium items-center gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
              onClick={() => setPerencanaanOPD(PerencanaanOPD ? false : true)}
            >
              <div className="flex items-center gap-2">
                <TbBuildingCommunity className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Perencanaan OPD</span>
              </div>
              <TbChevronRight className={`transition-all duration-200 ease-in-out ${PerencanaanOPD ? "rotate-90" : ""}`} />
            </li>
          }
          {/* SUB MENU PERENCANAAN OPD */}
          {(User?.roles == 'super_admin' || User?.roles == 'admin_opd') ?
            <div className={`transition-all duration-300 ease-in-out ${PerencanaanOPD ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <Link href="/pohonkinerjapemda">
                <li className={`flex items-center text-sm gap-x-2 cursor-pointer p-2 rounded-xl ${KotaPohonKinerjaKota ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBinaryTree className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Kinerja Pemda</span>
                </li>
              </Link>
              <Link href="/pohonkinerjaopd">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${pohonKinerjaOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBinaryTree className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Kinerja OPD</span>
                </li>
              </Link>
              <Link href="/pohoncascadingopd">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${PohonCascadingOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBinaryTree2 className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Cascading</span>
                </li>
              </Link>
              {/* LABEL RENSTRA */}
              <li
                className={`flex justify-between font-medium items-center gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
                onClick={() => setRenstra(Renstra ? false : true)}
              >
                <div className="flex items-center gap-2">
                  <TbBuildingCommunity className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Renstra</span>
                </div>
                <TbChevronRight className={`transition-all duration-200 ease-in-out ${Renstra ? "rotate-90" : ""}`} />
              </li>
              {/* SUBS MENU RENSTRA */}
              <div className={`transition-all duration-300 ease-in-out ${Renstra ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <Link href="/tujuanopd">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${TujuanOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbMapPin className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Tujuan OPD</span>
                  </li>
                </Link>
                <Link href="/sasaranopd">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${SasaranOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbTarget className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Sasaran OPD</span>
                  </li>
                </Link>
                <Link href="/ikuopd">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${IKUOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbChartBar className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>IKU OPD</span>
                  </li>
                </Link>
              </div>
              <Link href="/rencanaaksiopd">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${RencanaAksiOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbCalendarPlus className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Rencana Aksi OPD</span>
                </li>
              </Link>
              {/* LABEL PERMASALAHAN */}
              <li
                className={`flex justify-between font-medium items-center gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
                onClick={() => setPermasalahanOpd(PermasalahanOpd ? false : true)}
              >
                <div className="flex items-center gap-2">
                  <TbAlertCircle className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Permasalahan</span>
                </div>
                <TbChevronRight className={`transition-all duration-200 ease-in-out ${Renstra ? "rotate-90" : ""}`} />
              </li>
              {/* SUBS MENU PERMASALAHAN */}
              <div className={`transition-all duration-300 ease-in-out ${PermasalahanOpd ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <Link href="/permasalahanopd">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Permasalahan ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbAlertTriangle className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Permasalahan</span>
                  </li>
                </Link>
                <Link href="/isustrategis">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${IsuStrategis ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbTarget className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Isu Strategis</span>
                  </li>
                </Link>
              </div>
              {/* LABEL MASTER USULAN OPD */}
              {/* <li 
                className="flex items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
                onClick={() => setMasterUsulan(MasterUsulan ? false : true)}
              >
                <TbApps className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left`}>Master Usulan</span>
              </li> */}
              {/* SUBS MENU MASTER USULAN */}
              <div className={`transition-all duration-300 ease-in-out ${MasterUsulanOpd ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <Link href="/MasterUsulan/mastermusrenbang">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${MasterUsulanMusrenbang ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbBook2 className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Musrenbang</span>
                  </li>
                </Link>
                <Link href="/MasterUsulan/masterpokokpikiran">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${MasterUsulanPokir ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbBulb className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pokok Pikiran</span>
                  </li>
                </Link>
                <Link href="/MasterUsulan/mastermandatori">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${MasterUsulanMandatori ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbFileAlert className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Mandatori</span>
                  </li>
                </Link>
                <Link href="/MasterUsulan/masterinisiatif">
                  <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${MasterUsulanInisiatif ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                    <TbTooltip className="text-xl" />
                    <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Inisiatif Bupati</span>
                  </li>
                </Link>
              </div>
            </div>
            :
            <div className={`transition-all duration-300 ease-in-out ${PerencanaanOPD ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <Link href="/pohonkinerjaopd">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${pohonKinerjaOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBinaryTree className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Kinerja OPD</span>
                </li>
              </Link>
            </div>
          }



          {/* LABEL PERENCANAAN ASN */}
          {(User?.roles == 'eselon_1' || User?.roles == 'eselon_2' || User?.roles == 'eselon_3' || User?.roles == 'eselon_4' || User?.roles == 'level_1' || User?.roles == 'level_2' || User?.roles == 'level_3' || User?.roles == 'level_4') &&
            <li
              className={`flex font-medium justify-between items-center gap-x-2 cursor-pointer p-2 rounded-xl hover:bg-slate-500 transition-all duration-300 ease-in-out`}
              onClick={() => setPerencanaan(Perencanaan ? false : true)}
            >
              <div className="flex items-center gap-2">
                <TbBuildingFortress className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Perencanaan</span>
              </div>
              <TbChevronRight className={`transition-all duration-200 ease-in-out ${Perencanaan ? "rotate-90" : ""}`} />
            </li>
          }
          {/* SUB MENU PERENCANAAN ASN */}
          <div className={`transition-all duration-300 ease-in-out ${Perencanaan ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            {/* LABEL USULAN ASN */}
            {User?.roles == 'level_3' &&
              <li
                className="flex items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
                onClick={() => setUsulanLaporan(UsulanLaporan ? false : true)}
              >
                <TbApps className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Usulan</span>
              </li>
            }
            {/* subs menu USULAN ASN */}
            <div className={`transition-all duration-300 ease-in-out ${UsulanLaporan ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <Link href="/musrenbang">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Musrenbang ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBook2 className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Musrenbang</span>
                </li>
              </Link>
              <Link href="/pokokpikiran">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${PokokPikiran ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBulb className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pokok Pikiran</span>
                </li>
              </Link>
              <Link href="/mandatori">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Mandatori ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbFileAlert className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Mandatori</span>
                </li>
              </Link>
              <Link href="/inisiatif">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${Inisiatif ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbTooltip className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Inisiatif Bupati</span>
                </li>
              </Link>
            </div>
            <Link href="/pohonkinerjaopd">
              <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${pohonKinerjaOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbBinaryTree className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Kinerja</span>
              </li>
            </Link>
            <Link href="/pohoncascading">
              <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${PohonCascading ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbBinaryTree2 className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pohon Cascading</span>
              </li>
            </Link>
            <Link href="/rencanakinerja">
              <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${RencanaKinerja ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbChecklist className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Rencana Kinerja</span>
              </li>
            </Link>
            {User?.roles == 'level_3' &&
              <Link href="/rincianbelanja">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${RincianBelanja ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbShoppingCartDollar className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Rincian Belanja</span>
                </li>
              </Link>
            }
            {/* {(User?.roles == 'level_2' || User?.roles == 'level_3') &&
              <Link href="/manajemenresiko">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${PerencanaanManajemenResiko ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbRefreshAlert className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Manajemen Resiko</span>
                </li>
              </Link>
            } */}
          </div>



          {/* LABEL LAPORAN */}
          <li
            onClick={() => setLaporan(Laporan ? false : true)}
            className="flex justify-between font-medium items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
          >
            <div className="flex items-center gap-2">
              <TbBook className="text-xl" />
              <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Laporan</span>
            </div>
            <TbChevronRight className={`transition-all duration-200 ease-in-out ${Laporan ? "rotate-90" : ""}`} />
          </li>
          {/* SUB MENU LAPORAN */}
          <div className={`transition-all duration-300 ease-in-out ${Laporan ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            {/* LABEL LAPORAN USULAN */}
            {/* <li
              className="flex items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
              onClick={() => setLaporanUsulan(LaporanUsulan ? false : true)}
            >
              <TbApps className="text-xl" />
              <span className={`${!isOpen && 'hidden'} origin-left`}>Usulan</span>
            </li> */}
            {/* subs menu LAPORAN USULAN */}
            <div className={`transition-all duration-300 ease-in-out ${LaporanUsulan ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <Link href="#">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${LaporanMusrenbang ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBook2 className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Musrenbang</span>
                </li>
              </Link>
              <Link href="#">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${LaporanPokokPikiran ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbBulb className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Pokok Pikiran</span>
                </li>
              </Link>
              <Link href="#">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${LaporanMandatori ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbFileAlert className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Mandatori</span>
                </li>
              </Link>
              <Link href="#">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${LaporanInisiatif ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbTooltip className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Inisiatif Bupati</span>
                </li>
              </Link>
            </div>
            <Link href="listopd">
              <li className={`flex items-center gap-x-2 text-sm cursor-pointer p-2 rounded-xl ${OpdDiTematik ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbListDetails className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>List OPD di Tematik</span>
              </li>
            </Link>
            {/* LABEL LAPORAN REVIEW */}
            <li
              className="flex justify-between items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
              onClick={() => setReview(Review ? false : true)}
            >
              <div className="flex items-center gap-2">
                <TbClipboardText className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left`}>Review Pokin</span>
              </div>
              <TbChevronRight className={`transition-all duration-200 ease-in-out ${Review ? "rotate-90" : ""}`} />
            </li>
            {/* subs menu LAPORAN REVIEW */}
            <div className={`transition-all duration-300 ease-in-out ${Review ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <Link href="/reviewpemda">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${ReviewPemda ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbZoomExclamation className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Review Pemda</span>
                </li>
              </Link>
              <Link href="/reviewopd">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${ReviewOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbZoomExclamation className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Review OPD</span>
                </li>
              </Link>
            </div>
            {/* LABEL LAPORAN RENAKSI OPD (view only) */}
            <li
              className="flex justify-between items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl transition-all duration-300 ease-in-out"
              onClick={() => setRenstraView(RenstraView ? false : true)}
            >
              <div className="flex items-center gap-2">
                <TbBuildingCommunity className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left`}>Renstra OPD</span>
              </div>
              <TbChevronRight className={`transition-all duration-200 ease-in-out ${RenstraView ? "rotate-90" : ""}`} />
            </li>
            {/* subs menu LAPORAN REVIEW */}
            <div className={`transition-all duration-300 ease-in-out ${RenstraView ? 'px-3 py-2 flex flex-col border-l-2 border-white rounded-b-xl ml-2  max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
              <Link href="/tujuanopdview">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${TujuanOpdView ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbMapPin className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Tujuan OPD</span>
                </li>
              </Link>
              <Link href="/sasaranopdview">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${SasaranOpdView ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbTarget className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Sasaran OPD</span>
                </li>
              </Link>
              <Link href="/ikuopdview">
                <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${IkuOpdView ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                  <TbChartBar className="text-xl" />
                  <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>IKU OPD</span>
                </li>
              </Link>
            </div>
            <Link href="#">
              <li className={`flex items-center gap-x-2 text-sm cursor-pointer p-2 rounded-xl ${RencanaKinerjaKAK ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbChecklist className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Rencana Kinerja KAK</span>
              </li>
            </Link>
            <Link href="/laporanrincianbelanja">
              <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${LaporanRincianBelanja ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbDeviceImacDollar className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Rincian Belanja</span>
              </li>
            </Link>
            <Link href="/laporanrenstra">
              <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${LaporanRenstra ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbShoppingCartDollar className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Matrix Renstra</span>
              </li>
            </Link>
            <Link href="/laporancascadingopd">
              <li className={`flex items-center gap-x-2 cursor-pointer p-2 rounded-xl ${LaporanCascadingOpd ? "bg-white text-gray-800" : "hover:bg-slate-500"}`}>
                <TbListDetails className="text-xl" />
                <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Cascading OPD</span>
              </li>
            </Link>
          </div>



          {/* LOGOUT */}
          <li className="flex font-medium items-center gap-x-2 cursor-pointer p-2 hover:bg-slate-500 rounded-xl" onClick={() => logout()}>
            <TbLogout className="text-xl text-red-500" />
            <span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

