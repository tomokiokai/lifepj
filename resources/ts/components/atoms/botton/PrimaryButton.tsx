import { FC, ReactNode, memo } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

export const PrimaryButton: FC<Props> = memo((props) => {
  const { children, isDisabled = false, loading = false, onClick} = props;
  return (
    <Button
      bg="green.300"
      color="white"
      _hover={{ opacity: 0.8 }}
      isDisabled={isDisabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});