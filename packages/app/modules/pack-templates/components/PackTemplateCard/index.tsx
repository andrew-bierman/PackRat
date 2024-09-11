import { PackCard } from 'app/modules/pack/components';

export default function PackTemplateCard({ children, ...rest }) {
  return <PackCard {...rest} />;
}
