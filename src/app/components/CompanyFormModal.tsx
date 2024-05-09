"use client";

import React from "react";
import CompanyForm from "@/app/components/CompanyForm";
import Modal, { ModalProps } from "@/app/components/Modal";

export default function CompanyFormModal({ onClose, ...rest }: ModalProps) {
  return (
    <Modal {...rest} onClose={onClose}>
      <CompanyForm onSubmit={() => onClose()} />
    </Modal>
  );
};
