import React from 'react';
import { PackDetails } from 'app/components/pack/PackDetails';
import { AuthWrapper } from 'auth/authWrapper';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { helpers } from 'prefetchConf';

// export const runtime = 'experimental-edge'

function PackScreen(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { initialPackData } = props;
  return (
    <>
      <PackDetails />
    </>
  );
}

export default PackScreen;

PackScreen.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};

export async function getServerSideProps(context: GetServerSidePropsContext<{ url: string }>) {
  if (!context.req.url) {
    return {
      props: {
        initialPackData: null,
        trpcState: helpers.dehydrate(),
      }
    };
  }
  const url = new URL(context.req.url, `http://${context.req.headers.host}`);
  const packId = url.searchParams.get('id');
  const currentPack = packId ? await helpers.getPackById.prefetch({ packId }) : null;
  return {
    props: {
      trpcState: helpers.dehydrate(),
      initialPackData: currentPack,
    },
  };
}
