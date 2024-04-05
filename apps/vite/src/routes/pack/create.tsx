import React from 'react';
import { AddPack } from 'app/components/pack/AddPack';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pack/create')({
  component: CreatePack,
});

function CreatePack() {
  return (
    <AuthWrapper>
      <AddPack />
    </AuthWrapper>
  );
}

export default CreatePack;

CreatePack.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
