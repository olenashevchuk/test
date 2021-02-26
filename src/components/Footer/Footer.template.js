import { Button } from 'antd';

 const Footer = ({ primary, backgroundColor, size, label, ...props }) => {
    return (
      <Button>
        {label}
      </Button>
    );
  };
  
  export default Footer