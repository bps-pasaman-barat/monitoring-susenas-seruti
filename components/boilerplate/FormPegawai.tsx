"use client";

import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormDataPegwai,
  formPegawaiSchema,
} from "@/schema/vertikal-schemas/pegawai.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { fetcher } from "@/lib/utils";
import { toast } from "sonner";

interface IProps {
  title: string;
  instansi: string;
}

const gender = () => ({
  lakiLaki: 0,
  perempuan: 0,
});

const defaultValues: FormDataPegwai = {
  instansi: "",
  golongan: {
    I: gender(),
    II: gender(),
    III: gender(),
    IV: gender(),
  },
  pendidikan: {
    SD: gender(),
    SLTP: gender(),
    SLTA: gender(),
    D1_D2: gender(),
    D3: gender(),
    S1_D4: gender(),
    S2_S3: gender(),
  },
  umur: {
    U30: gender(),
    U31_40: gender(),
    U41_50: gender(),
    U51: gender(),
  },
  eselon: {
    V: gender(),
    IV: gender(),
    III: gender(),
    II: gender(),
  },
  jenjang_karir: {
    pim1: gender(),
    pim2: gender(),
    pim3: gender(),
    pim4: gender(),
  },
};

async function postPegawai(url: string, { arg }: { arg: any }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
}

export default function FormKepegawaian({ title, instansi }: IProps) {
  const { data } = useSWR(`/api/vertikal/pegawai/${instansi}`, fetcher);
  const isSubmitted: boolean = data?.data?.includes(instansi) ?? false;
  const { register, handleSubmit } = useForm<FormDataPegwai>({
    resolver: zodResolver(formPegawaiSchema),
    defaultValues,
  });

  const { trigger, isMutating } = useSWRMutation(
    `/api/vertikal/pegawai/${instansi}`,
    postPegawai
  );

  const onSubmit = async (formData: FormDataPegwai) => {
    const { instansi: _, ...payload } = formData;

    try {
      await trigger({
        instansi,
        data: payload,
      });

      toast.success("Data berhasil disimpan");

      mutate(`/api/vertikal/pegawai/${instansi}`);
    } catch (error: any) {
      toast.error(error?.message ?? "Gagal menyimpan data");
    }
  };

  const renderRow = (path: Path<FormDataPegwai>) => (
    <>
      <td className="border p-2">
        <Input
          type="number"
          {...register(`${path}.lakiLaki` as Path<FormDataPegwai>, {
            valueAsNumber: true,
          })}
        />
      </td>
      <td className="border p-2">
        <Input
          type="number"
          {...register(`${path}.perempuan` as Path<FormDataPegwai>, {
            valueAsNumber: true,
          })}
        />
      </td>
    </>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto bg-white p-6 border-2 rounded shadow"
    >
      <h1 className="text-sm lg:text-xl font-semibold mb-4">{title}</h1>

      <Badge
        className={
          isSubmitted ? "bg-green-600 text-white" : "bg-yellow-500 text-white"
        }
      >
        {isSubmitted ? "Sudah Pernah Disubmit" : "Belum Disubmit"}
      </Badge>

      <Section title="Pangkat / Golongan">
        {["I", "II", "III", "IV"].map((g) => (
          <tr key={g}>
            <td className="border p-2">{g}</td>
            {renderRow(`golongan.${g}` as Path<FormDataPegwai>)}
          </tr>
        ))}
      </Section>

      <Section title="Tingkat Pendidikan">
        {[
          ["SD", "SD"],
          ["SLTP", "SLTP"],
          ["SLTA", "SLTA"],
          ["D1/D2", "D1_D2"],
          ["D3", "D3"],
          ["S1/D4", "S1_D4"],
          ["S2/S3", "S2_S3"],
        ].map(([label, key]) => (
          <tr key={key}>
            <td className="border p-2">{label}</td>
            {renderRow(`pendidikan.${key}` as Path<FormDataPegwai>)}
          </tr>
        ))}
      </Section>

      <Button
        type="submit"
        className="w-full"
        disabled={isMutating || isSubmitted}
      >
        {isMutating
          ? "Menyimpan..."
          : isSubmitted
          ? "Sudah Disubmit"
          : "Simpan Data"}
      </Button>
    </form>
  );
}
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="font-semibold mb-2 mt-6">{title}</h2>
      <table className="w-full border mb-6 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Kategori</th>
            <th className="border p-2">Laki-laki</th>
            <th className="border p-2">Perempuan</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
}
