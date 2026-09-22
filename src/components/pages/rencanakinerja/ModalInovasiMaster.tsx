"use client";

import { useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ButtonSky, ButtonRed } from "@/components/global/Button";
import { getToken, getUser } from "@/components/lib/Cookie";
import { AlertNotification } from "@/components/global/Alert";
import { LoadingButtonClip } from "@/components/global/Loading";
import Select from "react-select";

export interface OptionType {
  value: string;
  label: string;
}

interface FormValue {
  kode_opd: string;
  nama_inovasi: string;
  jenis_inovasi_id: OptionType | null;
  kebaruan: string;
  asal_inovasi: OptionType | null;
  waktu_implementasi: string;
  instansi: string;
  inovator: string;
  level: OptionType | null;
  nip_inovator: OptionType | null;
}
interface modal {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  id_rekin: string;
  id?: string;
}

export const ModalInovasi: React.FC<modal> = ({
  isOpen,
  onClose,
  id_rekin,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();
  const token = getToken();
  const [user, setUser] = useState<any>(null);

  const [Loading, setLoading] = useState<boolean>(false);

  const [OptionNspk, setOptionNspk] = useState<OptionType[]>([]);
  const [NamaInovasi, setJudulInovasi] = useState<string>("");
  const [Kebaruan, setKebaruan] = useState<string>("");
  const [OptionAsal, setOptionAsal] = useState<OptionType[]>([]);
  const [selectedAsal, setSelectedAsal] = useState<string | null>(null);
  const [Instansi, setInstansi] = useState<string>("");
  const [Inovator, setInovator] = useState<string>("");
  const [optionLevel, setOptionLevel] = useState<OptionType[]>([]);
  const [optionPegawai, setOptionPegawai] = useState<OptionType[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const fetchOptionNspk = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/jenis-inovasi/findall`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      const data = result.data;
      const hasil = data.map((item: any) => ({
        value: item.id,
        label: `${item.jenis}`,
      }));
      setOptionNspk(hasil);
    } catch (err) {
      console.error(err, "gagal fetch option Jenis Inovasi");
    } finally {
      setLoading(false);
    }
  };

  const fetchOptionAsal = async () => {
    try {
      setLoading(true);

      const hasil = [
        {
          value: "Internal",
          label: "Internal",
        },
        {
          value: "Eksternal",
          label: "Eksternal",
        },
      ];

      setOptionAsal(hasil);
    } catch (err) {
      console.error(err, "gagal membuat option");
    } finally {
      setLoading(false);
    }
  };

  const fetchOptionLevel = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/role/findall`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      const data = result.data;

      const hasil = data.map((item: any) => ({
        value: item.id,
        label: `${item.role}`,
      }));

      setOptionLevel(hasil);
    } catch (err) {
      console.error(err, "gagal fetch option level");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptionLevel();
  }, []);

  const fetchOptionPegawai = async (level: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/pegawai_by_level/${user?.kode_opd}/${level}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();
      const data = result.data;

      const hasil = data.map((item: any) => ({
        value: item.nip,
        label: `${item.nama_pegawai}`,
      }));

      setOptionPegawai(hasil);
    } catch (err) {
      console.error(err, "gagal fetch option pegawai");
    } finally {
      setLoading(false);
    }
  };

  const handleLevelChange = (selected: OptionType | null) => {
    if (!selected) {
      setSelectedLevel(null);
      setOptionPegawai([]);
      return;
    }

    setSelectedLevel(selected.value);
    fetchOptionPegawai(selected.value);
  };

  type OptionType = {
    value: string;
    label: string;
  };

  const [Proses, setProses] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = getUser();
    if (fetchUser) {
      setUser(fetchUser.user);
    }
  }, []);

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = {
      rencana_kinerja_id: id_rekin,
      kode_opd: user?.kode_opd,
      nama_inovasi: data.nama_inovasi,
      jenis_inovasi_id: data.jenis_inovasi_id?.value,
      kebaruan: data.kebaruan,
      asal_inovasi: data.asal_inovasi?.value,
      waktu_implementasi: data.waktu_implementasi,
      instansi: data.instansi,
      inovator: data.inovator,
      nip_inovator: data.nip_inovator?.value,
      tahun: user?.tahun,
    };
    // console.log(formData);
    const errors = [];

    if (!formData.waktu_implementasi) {
      errors.push("Waktu implementasi tidak boleh kosong");
    }

    if (!formData.asal_inovasi) {
      errors.push("Asal Inovasi tidak boleh kosong");
    }

    if (!formData.kebaruan) {
      errors.push("Kebaruan tidak boleh kosong");
    }

    if (!formData.jenis_inovasi_id) {
      errors.push("Jenis inovasi tidak boleh kosong");
    }

    if (!formData.nama_inovasi) {
      errors.push("Nama inovasi tidak boleh kosong");
    }

    if (errors.length > 0) {
      errors.forEach((message) => {
        AlertNotification("Gagal", message, "error", 3000);
      });

      return;
    }
    try {
      setProses(true);
      const response = await fetch(
        `${API_URL}/inovasi_rekin/create/${id_rekin}`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) {
        AlertNotification(
          "Berhasil",
          "menambahkan inovasi sasaran pada rencana kinerja",
          "success",
          2000,
        );
        onClose();
      } else {
        AlertNotification(
          "Gagal",
          "cek koneksi internet / database server",
          "error",
          2000,
        );
      }
    } catch (err) {
      console.log(err);
      AlertNotification(
        "Gagal",
        "cek koneksi internet / database server",
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
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={() => {
            onClose();
            setJudulInovasi("");
          }}
        ></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`bg-white rounded-lg p-8 z-10 w-4/5 max-h-[90vh] overflow-y-auto`}
        >
          <div className="w-max-[500px] py-2 border-b">
            <h1 className="text-xl uppercase">Tambah Inovasi</h1>
          </div>
          <div className="flex flex-col py-3">
            <label
              className="uppercase text-xs font-bold text-gray-700 my-2"
              htmlFor="nama_inovasi"
            >
              Nama Inovasi:
            </label>
            <Controller
              name="nama_inovasi"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="border px-4 py-2 rounded-lg"
                  id="nama_inovasi"
                  type="text"
                  placeholder="masukkan Nama Inovasi"
                  value={field.value || NamaInovasi}
                  onChange={(e) => {
                    field.onChange(e);
                    setJudulInovasi(e.target.value);
                  }}
                />
              )}
            />
          </div>
          <div className="flex flex-col py-3">
            <label
              className="uppercase text-xs font-bold text-gray-700 my-2"
              htmlFor="jenis_inovasi_id"
            >
              Jenis Inovasi:
            </label>
            <Controller
              name="jenis_inovasi_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="jenis_inovasi_id"
                  placeholder="Pilih Jenis Inovasi"
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
              htmlFor="kebaruan"
            >
              Kebaruan:
            </label>
            <Controller
              name="kebaruan"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="border px-4 py-2 rounded-lg"
                  id="kebaruan"
                  type="text"
                  placeholder="masukkan Kebaruan"
                  value={field.value || Kebaruan}
                  onChange={(e) => {
                    field.onChange(e);
                    setKebaruan(e.target.value);
                  }}
                />
              )}
            />
          </div>
          <div className="flex flex-col py-3">
            <label
              className="uppercase text-xs font-bold text-gray-700 my-2"
              htmlFor="waktu_implementasi"
            >
              Waktu Implementasi:
            </label>
            <Controller
              name="waktu_implementasi"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="border px-4 py-2 rounded-lg"
                  id="waktu_implementasi"
                  type="date"
                />
              )}
            />
          </div>
          <div className="flex flex-col py-3">
            <label
              className="uppercase text-xs font-bold text-gray-700 my-2"
              htmlFor="asal_inovasi"
            >
              Asal Inovasi:
            </label>
            <Controller
              name="asal_inovasi"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="asal_inovasi"
                  placeholder="Pilih Asal Inovasi"
                  options={OptionAsal}
                  isLoading={Loading}
                  onMenuOpen={() => {
                    fetchOptionAsal();
                  }}
                  onChange={(selected) => {
                    field.onChange(selected);
                    setSelectedAsal(selected?.value || null);

                    // Reset pilihan level dan pegawai ketika ganti asal
                    setSelectedLevel(null);
                    setOptionPegawai([]);
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
          {selectedAsal === "Eksternal" && (
            <>
              <div className="flex flex-col py-3">
                <label
                  className="uppercase text-xs font-bold text-gray-700 my-2"
                  htmlFor="instansi"
                >
                  Instansi/Lembaga/Masyarakat:
                </label>
                <Controller
                  name="instansi"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="border px-4 py-2 rounded-lg"
                      id="instansi"
                      type="text"
                      placeholder="masukkan Instansi"
                      value={field.value || Instansi}
                      onChange={(e) => {
                        field.onChange(e);
                        setInstansi(e.target.value);
                      }}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col py-3">
                <label
                  className="uppercase text-xs font-bold text-gray-700 my-2"
                  htmlFor="inovator"
                >
                  Inovator:
                </label>
                <Controller
                  name="inovator"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="border px-4 py-2 rounded-lg"
                      id="inovator"
                      type="text"
                      placeholder="masukkan Inovator"
                      value={field.value || Inovator}
                      onChange={(e) => {
                        field.onChange(e);
                        setInovator(e.target.value);
                      }}
                    />
                  )}
                />
              </div>
            </>
          )}
          {selectedAsal === "Internal" && (
            <>
              <div className="flex flex-col py-3">
                <label className="uppercase text-xs font-bold text-gray-700 my-2">
                  Level:
                </label>

                <Select
                  options={optionLevel}
                  placeholder="Pilih Level"
                  isClearable
                  onChange={handleLevelChange}
                />
              </div>

              <div className="flex flex-col py-3">
                <label
                  className="uppercase text-xs font-bold text-gray-700 my-2"
                  htmlFor="nip_inovator"
                >
                  Pegawai:
                </label>

                <Controller
                  name="nip_inovator"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="nip_inovator"
                      placeholder={
                        selectedLevel
                          ? "Pilih Pegawai"
                          : "Pilih level terlebih dahulu"
                      }
                      options={optionPegawai}
                      isDisabled={!selectedLevel}
                      isClearable
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderRadius: "8px",
                          borderColor: "black",
                          "&:hover": {
                            borderColor: "#3673CA",
                          },
                        }),
                      }}
                    />
                  )}
                />
              </div>
            </>
          )}
          <ButtonSky className="w-full my-3" type="submit" disabled={Proses}>
            Simpan
          </ButtonSky>
          <ButtonRed
            className="w-full my-3"
            onClick={() => {
              onClose();
              setJudulInovasi("");
            }}
          >
            Batal
          </ButtonRed>
        </form>
      </div>
    );
  }
};
export const ModalInovasiEdit: React.FC<modal> = ({
  isOpen,
  onClose,
  id_rekin,
  id,
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();
  const [NamaInovasi, setNamaInovasi] = useState<string>("");
  const [Kebaruan, setKebaruan] = useState<string>("");
  const [OptionAsal, setOptionAsal] = useState<OptionType[]>([]);
  const [selectedAsal, setSelectedAsal] = useState<string | null>(null);
  const [Instansi, setInstansi] = useState<string>("");
  const [Inovator, setInovator] = useState<string>("");
  const [optionLevel, setOptionLevel] = useState<OptionType[]>([]);
  const [optionPegawai, setOptionPegawai] = useState<OptionType[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const [Loading, setLoading] = useState<boolean>(false);

  const [OptionNspk, setOptionNspk] = useState<OptionType[]>([]);

  const fetchOptionNspk = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/jenis-inovasi/findall`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      const data = result.data;
      const hasil = data.map((item: any) => ({
        value: item.id,
        label: `${item.jenis}`,
      }));
      setOptionNspk(hasil);
    } catch (err) {
      console.error(err, "gagal fetch option Jenis Inovasi");
    } finally {
      setLoading(false);
    }
  };

  const fetchOptionAsal = async () => {
    try {
      setLoading(true);

      const hasil = [
        {
          value: "Internal",
          label: "Internal",
        },
        {
          value: "Eksternal",
          label: "Eksternal",
        },
      ];

      setOptionAsal(hasil);
    } catch (err) {
      console.error(err, "gagal membuat option");
    } finally {
      setLoading(false);
    }
  };

  const fetchOptionLevel = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/role/findall`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      const data = result.data;

      const hasil = data.map((item: any) => ({
        value: item.id,
        label: `${item.role}`,
      }));

      setOptionLevel(hasil);
    } catch (err) {
      console.error(err, "gagal fetch option level");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptionLevel();
  }, []);

  const fetchOptionPegawai = async (level: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/pegawai_by_level/${user?.kode_opd}/${level}`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();
      const data = result.data;

      const hasil = data.map((item: any) => ({
        value: item.nip,
        label: `${item.nama_pegawai}`,
      }));

      setOptionPegawai(hasil);
    } catch (err) {
      console.error(err, "gagal fetch option pegawai");
    } finally {
      setLoading(false);
    }
  };

  const handleLevelChange = (selected: OptionType | null) => {
    if (!selected) {
      setSelectedLevel(null);
      setOptionPegawai([]);
      return;
    }

    setSelectedLevel(selected.value);
    fetchOptionPegawai(selected.value);
  };

  const [Proses, setProses] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const token = getToken();

  useEffect(() => {
    const fetchUser = getUser();
    if (fetchUser) {
      setUser(fetchUser.user);
    }
  }, []);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const fetchId = async () => {
      try {
        const response = await fetch(`${API_URL}/inovasi_rekin/detail/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const result = await response.json();
        const data = result.inovasi_rekin;
        if (data.nama_inovasi) {
          setNamaInovasi(data.nama_inovasi || "");
          // alert("TIDAK ADA BOSS");
        }
        if (data.jenis_inovasi_id) {
          setValue("jenis_inovasi_id", {
            value: data.jenis_inovasi_id,
            label: data.jenis_inovasi,
          });
        }
        if (data.kebaruan) {
          setKebaruan(data.kebaruan || "");
        }
        if (data.waktu_implementasi) {
          setValue("waktu_implementasi", data.waktu_implementasi.split("T")[0]);
        }
        if (data.asal_inovasi) {
          setValue("asal_inovasi", {
            value: data.asal_inovasi,
            label: data.asal_inovasi,
          });
          setSelectedAsal(data.asal_inovasi);
        }

        if (data.instansi) {
          setInstansi(data.instansi || "");
        }
        if (data.inovator) {
          setInovator(data.inovator || "");
        }
        if (data.level && optionLevel.length > 0) {
          const levelOption = optionLevel.find(
            (item) => item.label === data.level,
          );

          if (levelOption) {
            setValue("level", levelOption);
            setSelectedLevel(levelOption.value);

            await fetchOptionPegawai(levelOption.value);
          }
        }
        if (data.nip_inovator) {
          setValue("nip_inovator", {
            value: data.nip_inovator,
            label: data.nama_nip_inovator,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (isOpen) {
      fetchId();
    }
  }, [id, token, isOpen, setValue, optionLevel]);

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const formData = {
      //key : value
      rencana_kinerja_id: id_rekin,
      kode_opd: user?.kode_opd,
      nama_inovasi: NamaInovasi,
      jenis_inovasi_id: data.jenis_inovasi_id?.value,
      kebaruan: Kebaruan,
      waktu_implementasi: data.waktu_implementasi,
      asal_inovasi: data.asal_inovasi?.value,
      instansi: Instansi,
      inovator: Inovator,
      level: data.level?.value,
      nip_inovator: data.nip_inovator?.value,
    };
    // console.log(formData);
    const errors = [];

    if (!formData.waktu_implementasi) {
      errors.push("Waktu implementasi tidak boleh kosong");
    }

    if (!formData.jenis_inovasi_id) {
      errors.push("Jenis inovasi tidak boleh kosong");
    }

    if (!formData.nama_inovasi) {
      errors.push("Nama inovasi tidak boleh kosong");
    }

    if (errors.length > 0) {
      errors.forEach((message) => {
        AlertNotification("Gagal", message, "error", 3000);
      });

      return;
    }
    try {
      setProses(true);
      const response = await fetch(`${API_URL}/inovasi_rekin/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        AlertNotification("Berhasil", "Berhasil edit inovasi", "success", 1000);
        onClose();
      } else {
        AlertNotification(
          "Gagal",
          "terdapat kesalahan pada backend / database server",
          "error",
          2000,
        );
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
          className={`bg-white rounded-lg p-8 z-10 w-4/5 text-start max-h-[90vh] overflow-y-auto`}
        >
          <div className="w-max-[500px] py-2 border-b text-center">
            <h1 className="text-xl uppercase">Edit Inovasi {id}</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mx-5 py-5"
          >
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="nama_inovasi"
              >
                Nama Inovasi:
              </label>
              <Controller
                name="nama_inovasi"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border px-4 py-2 rounded-lg"
                    id="nama_inovasi"
                    type="text"
                    placeholder="masukkan nama inovasi"
                    value={NamaInovasi}
                    onChange={(e) => {
                      field.onChange(e);
                      setNamaInovasi(e.target.value);
                    }}
                  />
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="jenis_inovasi"
              >
                Jenis Inovasi:
              </label>
              <Controller
                name="jenis_inovasi_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="jenis_inovasi_id"
                    placeholder="Pilih Jenis Inovasi"
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
                htmlFor="kebaruan"
              >
                Kebaruan:
              </label>
              <Controller
                name="kebaruan"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border px-4 py-2 rounded-lg"
                    id="kebaruan"
                    type="text"
                    placeholder="masukkan Kebaruan"
                    value={field.value || Kebaruan}
                    onChange={(e) => {
                      field.onChange(e);
                      setKebaruan(e.target.value);
                    }}
                  />
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="waktu_implementasi"
              >
                Waktu Implementasi:
              </label>
              <Controller
                name="waktu_implementasi"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border px-4 py-2 rounded-lg"
                    id="waktu_implementasi"
                    type="date"
                  />
                )}
              />
            </div>
            <div className="flex flex-col py-3">
              <label
                className="uppercase text-xs font-bold text-gray-700 my-2"
                htmlFor="asal_inovasi"
              >
                Asal Inovasi:
              </label>
              <Controller
                name="asal_inovasi"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="asal_inovasi"
                    placeholder="Pilih Asal Inovasi"
                    options={OptionAsal}
                    isLoading={Loading}
                    onMenuOpen={() => {
                      fetchOptionAsal();
                    }}
                    onChange={(selected) => {
                      field.onChange(selected);
                      setSelectedAsal(selected?.value || null);

                      // Reset pilihan level dan pegawai ketika ganti asal
                      setSelectedLevel(null);
                      setOptionPegawai([]);
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
            {selectedAsal === "Eksternal" && (
              <>
                <div className="flex flex-col py-3">
                  <label
                    className="uppercase text-xs font-bold text-gray-700 my-2"
                    htmlFor="instansi"
                  >
                    Instansi:
                  </label>
                  <Controller
                    name="instansi"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="border px-4 py-2 rounded-lg"
                        id="instansi"
                        type="text"
                        placeholder="masukkan Instansi"
                        value={field.value || Instansi}
                        onChange={(e) => {
                          field.onChange(e);
                          setInstansi(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col py-3">
                  <label
                    className="uppercase text-xs font-bold text-gray-700 my-2"
                    htmlFor="inovator"
                  >
                    Inovator:
                  </label>
                  <Controller
                    name="inovator"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="border px-4 py-2 rounded-lg"
                        id="inovator"
                        type="text"
                        placeholder="masukkan Inovator"
                        value={field.value || Inovator}
                        onChange={(e) => {
                          field.onChange(e);
                          setInovator(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              </>
            )}
            {selectedAsal === "Internal" && (
              <>
                <div className="flex flex-col py-3">
                  <label className="uppercase text-xs font-bold text-gray-700 my-2">
                    Level:
                  </label>

                  <Controller
                    name="level"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        id="level"
                        options={optionLevel}
                        placeholder="Pilih Level"
                        isClearable
                        onChange={(selected) => {
                          field.onChange(selected);
                          handleLevelChange(selected);
                        }}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: "8px",
                            borderColor: "black",
                            "&:hover": {
                              borderColor: "#3673CA",
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
                    htmlFor="nip_inovator"
                  >
                    Pegawai:
                  </label>

                  <Controller
                    name="nip_inovator"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        id="nip_inovator"
                        placeholder={
                          selectedLevel
                            ? "Pilih Pegawai"
                            : "Pilih level terlebih dahulu"
                        }
                        options={optionPegawai}
                        isDisabled={!selectedLevel}
                        isClearable
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: "8px",
                            borderColor: "black",
                            "&:hover": {
                              borderColor: "#3673CA",
                            },
                          }),
                        }}
                      />
                    )}
                  />
                </div>
              </>
            )}
            <ButtonSky className="w-full my-3" type="submit" disabled={Proses}>
              {Proses ? (
                <span className="flex">
                  <LoadingButtonClip />
                  Menyimpan...
                </span>
              ) : (
                "Simpan"
              )}
            </ButtonSky>
            <ButtonRed className="w-full my-3" onClick={onClose}>
              Batal
            </ButtonRed>
          </form>
        </div>
      </div>
    );
  }
};
