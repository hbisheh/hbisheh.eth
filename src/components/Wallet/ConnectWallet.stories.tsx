import type { Meta, StoryObj } from "@storybook/react";

import { ConnectWallet, type ConnectWalletProps } from "./ConnectWallet";
import { WalletProvider } from "../../decorators/WalletProvider";

const meta: Meta<ConnectWalletProps> = {
  title: "Components/ConnectWallet",
  parameters: {
    backgrounds: {
      default: "container",
    },
  },
  decorators: [
    WalletProvider,
    (Story) => <div className="ink-min-h-[300px]">{Story()}</div>,
  ],
  component: ConnectWallet,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};