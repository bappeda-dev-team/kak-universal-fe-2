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
import { OptionTypeString } from "@/types";
import { ArahKebijakanOpd, FormValue } from "../type";
import { useBrandingContext } from "@/context/BrandingContext";

interface modal {
  isOpen: boolean;
  onClose: () => void;
  Data: ArahKebijakanOpd | null;
  jenis: "tambah" | "edit";
  pokin_id: number;
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
  pokin_id,
  Data,
  onSuccess,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      arah: Data?.arah || "",
    },
  });
  const { branding } = useBrandingContext();

  const [Proses, setProses] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const token = getToken();

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const formData = {
      //key : value
      arah: data.arah,
      kode_opd: kode_opd,
      tahun: tahun,
      pokin_id: pokin_id,
    };
    // console.log(formData);
    try {
      setProses(true);
      let url = "";
      if (jenis === "tambah") {
        url = "arah-kebijakan/create";
      } else if (jenis === "edit") {
        url = `arah-kebijakan/update/${Data?.id}`;
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
          `Berhasil ${jenis === "edit" ? "mengubah" : "menambah"} Arah Kebijakan`,
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
        <div className={`bg-white rounded-lg p-8 z-10 w-4/5 text-start`}>
          <div className="w-max-[500px] py-2 border-b text-center">
            <h1 className="text-xl uppercase">{jenis} Arah Kebijakan</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mx-5 py-5"
          >
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="jenis"
              >
                Arah Kebijakan:
              </label>
              <Controller
                name="arah"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border px-4 py-2 rounded-lg"
                    placeholder={`Masukkan Arah Kebijakan`}
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
