import React from "react";
import { Form, Formik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CompanyStatus,
  createCompany,
  getCategories,
  getCountries,
} from "@/lib/api";
import Button from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import LogoUploader from "@/app/components/LogoUploader";
import StatusLabel from "@/app/components/StatusLabel";

export type CompanyFieldValues = {
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  categoryId: string;
  countryId: string;
};

const initialValues: CompanyFieldValues = {
  title: "",
  description: "",
  status: CompanyStatus.Active,
  joinedDate: "",
  categoryId: "",
  countryId: "",
};

export interface CompanyFormProps {
  onSubmit?: (values: CompanyFieldValues) => void | Promise<void>;
}

export default function CompanyForm({ onSubmit }: CompanyFormProps) {
  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 10 * 1000,
  });

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: 10 * 1000,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });

  const handleSubmit = async (values: CompanyFieldValues) => {
    await mutateAsync({
      ...values,
      categoryTitle:
        categories?.find(({ id }) => id === values.categoryId)?.title ?? '',
      countryTitle:
        countries?.find(({ id }) => id === values.countryId)?.title ?? '',
    });

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-10">
        <p className="mb-0.5 text-xl">Add new company</p>
        <div className="flex gap-6">
          <div className="flex flex-col flex-1 gap-5">
            <LogoUploader label="Logo" placeholder="Upload photo" />
            <div>
              <label htmlFor="status" className="text-base color-gray-900">Status</label>
              <select
                name="status"
                id="status"
                required
                className="mt-2 p-3 h-11 text-sm rounded border border-gray-300 shadow block w-full"
              >
                {(Object.values(CompanyStatus) as CompanyStatus[]).map(
                  (status) => (
                    <option key={status} value={status}>
                      <StatusLabel status={status} styled={false} />
                    </option>
                  ),
                )}
              </select>
            </div>
            <div>
              <label htmlFor="countryId" className="text-base color-gray-900">Country</label>
              <select
                name="countryId"
                id="countryId"
                required
                className="mt-2 p-3 h-11 text-sm rounded border border-gray-300 shadow block w-full"
              >
                {countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-5">
            <InputField required label="Name" placeholder="Name" name="title" />
            <div>
              <label htmlFor="categoryId" className="text-base color-gray-900">Category</label>
              <select
                name="categoryId"
                id="categoryId"
                required
                className="mt-2 p-3 h-11 text-sm rounded border border-gray-300 shadow block w-full"
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <InputField
              required
              label="Joined date"
              type="date"
              name="joinedDate"
            />
            <InputField
              required
              label="Description"
              placeholder="Description"
              name="description"
            />
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          Add company
        </Button>
      </Form>
    </Formik>
  );
}
