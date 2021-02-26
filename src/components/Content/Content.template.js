import { Button } from 'antd';

 const Content = ({ primary, backgroundColor, size, label, ...props }) => {
    return (
      <Button>
        {label}
      </Button>
    );
  };

  export default Content