import { Select } from 'tamagui';

export default CustomSelect = ({ props, items }) => {
  const { value, booleanStrings, ...others } = props;

  return (
    <Select {...others} onValueChange={props.onChange} value={value}>
      <Select.Trigger>
        {!booleanStrings ? value : value ? 'yes' : 'For me only'}
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Group>
            {items.map((item, i) => (
              <Select.Item
                index={i}
                key={item}
                value={!booleanStrings ? item : value === 'yes' ? true : false}
              >
                <Select.ItemText>{item.toUpperCase()}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
};
