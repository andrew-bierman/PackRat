import React from 'react'
import { AddPack } from 'app/components/pack/AddPack';
import { AuthWrapper } from 'pages/authWrapper';

function CreatePack() {
    return (
        <AddPack />
    )
}

export default CreatePack

CreatePack.getLayout = function getLayout(page: any) {
    return <AuthWrapper>{page}</AuthWrapper>;
};