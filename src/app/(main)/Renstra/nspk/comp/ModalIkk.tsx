"use client";

import React, { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";
import {
  ButtonSky,
  ButtonRed,
  ButtonSkyBorder,
} from "@/components/global/Button";
import { getToken, getUser } from "@/components/lib/Cookie";
import { AlertNotification } from "@/components/global/Alert";
import { LoadingButtonClip } from "@/components/global/Loading";
import Select from "react-select";
import { OptionType } from "@/types";
import { NspkOpdFindall, FormValue } from "../type";
import { useBrandingContext } from "@/context/BrandingContext";

interface modal {
  isOpen: boolean;
  onClose: () => void;
  Data: NspkOpdFindall | null;
  jenis: "tambah" | "edit";
  kode_opd: string;
  tahun: number;
  onSuccess: () => void;
}

export const ModalIkk: React.FC<modal> = ({
  isOpen,
  onClose,
  jenis,
  tahun,
  kode_opd,
  Data,
  onSuccess,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      id_nspk: Data?.id_nspk
        ? {
            value: Data?.id_nspk,
            label: `(${Data?.id_nspk}) ${Data?.nspk}`,
          }
        : null,
      id_tujuan_opd: Data?.id_tujuan_opd
        ? {
            value: Data?.id_tujuan_opd,
            label: `(${Data?.id_tujuan_opd}) ${Data?.tujuan_opd}`,
          }
        : null,
      id_sasaran_opd: Data?.id_sasaran_opd
        ? {
            value: Data?.id_sasaran_opd,
            label: `(${Data?.id_sasaran_opd}) ${Data?.sasaran_opd}`,
          }
        : null,
    },
  });
  const { branding } = useBrandingContext();

  const [Proses, setProses] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const token = getToken();

  const [OptionNspk, setOptionNspk] = useState<OptionType[]>([]);
  const [OptionTujuanOpd, setOptionTujuanOpd] = useState<OptionType[]>([]);
  const [OptionSasaranOpd, setOptionSasaranOpd] = useState<OptionType[]>([]);

  const fetchOptionNspk = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/nspk/findall/${kode_opd}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      const data = result.data;
      const hasil = data.map((item: any) => ({
        value: item.id,
        label: `${item.nspk}`,
      }));
      setOptionNspk(hasil);
    } catch (err) {
      console.error(err, "gagal fetch option Nspk");
    } finally {
      setLoading(false);
    }
  };
  const fetchOptionTujuanOpd = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/tujuan_opd/penetapan/${kode_opd}/${tahun}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const result = await response.json();
      const data = result.data.flatMap((item: any) => item.tujuan_opd);
      const hasil = data.map((item: any) => ({
        value: item.id_tujuan_opd,
        label: `${item.tujuan}`,
      }));
      setOptionTujuanOpd(hasil);
    } catch (err) {
      console.error(err, "gagal fetch option Tujuan OPD");
    } finally {
      setLoading(false);
    }
  };

  const fetchOptionSasaranOpd = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/sasaran_opd/penetapan/${kode_opd}/${tahun}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const result = await response.json();
      const data = result.data.flatMap((item: any) => item.sasaran_opd);
      const hasil = data.map((item: any) => ({
        value: item.id,
        label: `${item.nama_sasaran_opd}`,
      }));
      setOptionSasaranOpd(hasil);
    } catch (err) {
      console.error(err, "gagal fetch option Tujuan OPD");
    } finally {
      setLoading(false);
    }
  };

  const OptionJenis = [
    { value: "output", label: "output" },
    { value: "outcome", label: "outcome" },
  ];

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    // console.log("DATA FORM:", data);
    const formData = {
      //key : value
      id_nspk: data.id_nspk?.value,
      id_tujuan_opd: data.id_tujuan_opd?.value,
      id_sasaran_opd: data.id_sasaran_opd?.value,
      kode_opd: kode_opd,
      tahun: tahun,
    };
    // console.log("FORM DATA:", formData);
    // console.log(formData);
    try {
      setProses(true);
      let url = "";
      if (jenis === "tambah") {
        url = "nspk-opd/create";
      } else if (jenis === "edit") {
        url = `nspk-opd/update/${Data?.id}`;
      } else {
        url = "";
      }
      const response = await fetch(`${branding?.api_perencanaan}/${url}`, {
        method: jenis === "tambah" ? "POST" : "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.code === 201 || result.code === 200) {
        AlertNotification(
          "Berhasil",
          `Berhasil ${jenis === "edit" ? "mengubah" : "menambah"} NSPK OPD`,
          "success",
          1000,
        );
        onSuccess();
        onClose();
      } else {
        AlertNotification("Gagal", `${result.data}`, "error", 2000);
      }
    } catch (err) {
      AlertNotification(
        "Gagal",
        "cek koneksi internet/terdapat kesalahan pada database server",
        "error",
        2000,
      );
    } finally {
      setProses(false);
    }
  };

  if (!isOpen) {
    return null;
  } else {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className={`fixed inset-0 bg-black opacity-30`}
          onClick={onClose}
        ></div>
        <div
          className={`bg-white rounded-lg p-8 z-10 w-4/5 text-start h-[90%] overflow-auto`}
        >
          <div className="w-max-[500px] py-2 border-b text-center">
            <h1 className="text-xl uppercase">{jenis} NSPK</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mx-5 py-5"
          >
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="id_nspk"
              >
                NSPK:
              </label>
              <Controller
                name="id_nspk"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="id_nspk"
                    placeholder="Pilih NSPK"
                    options={OptionNspk}
                    isLoading={Loading}
                    onMenuOpen={() => {
                      fetchOptionNspk();
                    }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "8px",
                        borderColor: "black", // Warna default border menjadi merah
                        "&:hover": {
                          borderColor: "#3673CA", // Warna border tetap merah saat hover
                        },
                      }),
                    }}
                  />
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="id_tujuan_opd"
              >
                Tujuan OPD:
              </label>
              <Controller
                name="id_tujuan_opd"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="id_tujuan_opd"
                    placeholder="Pilih Tujuan OPD"
                    options={OptionTujuanOpd}
                    isLoading={Loading}
                    onMenuOpen={() => {
                      fetchOptionTujuanOpd();
                    }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "8px",
                        borderColor: "black", // Warna default border menjadi merah
                        "&:hover": {
                          borderColor: "#3673CA", // Warna border tetap merah saat hover
                        },
                      }),
                    }}
                  />
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="id_sasaran_opd"
              >
                Sasaran OPD:
              </label>
              <Controller
                name="id_sasaran_opd"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="id_sasaran_opd"
                    placeholder="Pilih Sasaran OPD"
                    options={OptionSasaranOpd}
                    isLoading={Loading}
                    onMenuOpen={() => {
                      fetchOptionSasaranOpd();
                    }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "8px",
                        borderColor: "black", // Warna default border menjadi merah
                        "&:hover": {
                          borderColor: "#3673CA", // Warna border tetap merah saat hover
                        },
                      }),
                    }}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <ButtonSky className="w-full" type="submit" disabled={Proses}>
                {Proses ? (
                  <span className="flex">
                    <LoadingButtonClip />
                    Menyimpan...
                  </span>
                ) : (
                  "Simpan"
                )}
              </ButtonSky>
              <ButtonRed className="w-full" onClick={onClose}>
                Batal
              </ButtonRed>
            </div>
          </form>
        </div>
      </div>
    );
  }
};
