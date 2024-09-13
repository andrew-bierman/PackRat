import PackTemplatePrimaryCard from './PackTemplatePrimaryCard';

export function PackTemplateCard({ children, ...rest }) {
  // No usecase or need for packtemplate preview card currently
  // Implement PackTemplateSecondaryCard whenever needed and add the logic for rendering it
  return <PackTemplatePrimaryCard {...rest} />;
}
