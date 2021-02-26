import { Button } from 'antd';

const CustomButton = ({label, ...props }) => {
    return (
      <Button type='primary' {...props}>
        {label}
      </Button>
    );
  };

  export default CustomButton