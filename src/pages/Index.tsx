import { Layout, PromoBanner } from "@/components/layout";
import { SwapCard } from "@/components/exchange/SwapCard";

const Index = () => {
  return (
    <Layout>
      <PromoBanner onCtaClick={() => {}} />
      <SwapCard />
    </Layout>
  );
};

export default Index;
