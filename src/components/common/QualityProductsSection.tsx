import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, imageSrc }) => {
  return (
    <div
      className="bg-[#071715] text-white rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between text-center space-y-6 border border-[#00A88F]/40 hover:border-[#00A88F] hover:bg-[#0A231F] hover:scale-[1.02] transition-all duration-300 shadow-lg"
    >
      {/* Product Image Box */}
      <div className="w-full h-40 sm:h-44 flex items-center justify-center p-2 relative">
        <img
          src={imageSrc}
          alt={title}
          className="max-h-full max-w-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text Info */}
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#9EB8B0]">
          {description}
        </p>
      </div>
    </div>
  );
};

export const QualityProductsSection: React.FC = () => {
  const products: ProductCardProps[] = [
    {
      title: 'Mobile Phone',
      description: 'Preowned and used mobile phones.',
      imageSrc: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Tablet',
      description: 'iPad and Android tablets with accessories.',
      imageSrc: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Macbook',
      description: "A wide range of all Apple MacBook variant's.",
      imageSrc: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Wearables',
      description: 'A wide range of wearables available.',
      imageSrc: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Controllers',
      description: 'A wide range of controllers available,',
      imageSrc: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Consoles',
      description: 'A wide range of consoles available.',
      imageSrc: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section className="bg-black text-white rounded-3xl border border-[#063F35] p-6 sm:p-10 lg:p-14 space-y-10 shadow-2xl">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Quality & Affordable Products & Solutions
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-[#9EB8B0] font-medium leading-relaxed">
          We Offer An Extensive And Affordable Product Range To Fit With Your Needs And Budgets.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item, idx) => (
          <ProductCard
            key={idx}
            title={item.title}
            description={item.description}
            imageSrc={item.imageSrc}
          />
        ))}
      </div>
    </section>
  );
};

export default QualityProductsSection;
