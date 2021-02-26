import { Button } from 'antd';

const Header = ({ primary, backgroundColor, size, label, ...props }) => {
    return (
      <Button>
        {label}
      </Button>
    );
  };

  export  default Header