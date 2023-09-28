import { Select } from 'tamagui';

export default CustomSelect = ({ props, items }) => {
  const { value, ...others } = props;

  return (
    <Select {...others} onValueChange={props.onChange} value={value}>
      <Select.Trigger>{value}</Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Group>
            {items.map((item, i) => (
              <Select.Item index={i} key={item} value={item}>
                <Select.ItemText>{item.toUpperCase()}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
};
