import React, { createContext, useContext, useState } from 'react';
import { initialMandiData } from '../data/mandiData';
import { initialCropsList, initialCollectivePools } from '../data/cropsData';
import { equipmentCatalog } from '../data/equipmentData';

const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('FARMER'); // 'FARMER' or 'BUYER'
  const [activeTab, setActiveTab] = useState('home');
  const [crops, setCrops] = useState(initialCropsList);
  const [pools, setPools] = useState(initialCollectivePools);
  const [equipment] = useState(equipmentCatalog);
  const [mandiList] = useState(initialMandiData);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const addToCart = (item) => {
    setCart((prev) => [...prev, { ...item, cartId: Date.now() }]);
    showNotification(`Added ${item.title || item.name} to inquiry list!`, 'success');
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const addProduceListing = (newProduce) => {
    const produceObj = {
      ...newProduce,
      id: 'c_' + Date.now(),
      farmerName: 'You (Verified Farmer)',
      distanceKm: 0,
      organicCertified: newProduce.organicCertified || false
    };
    setCrops((prev) => [produceObj, ...prev]);
    showNotification('Crop listed successfully on KrishiSetu Direct Market!', 'success');
  };

  const joinPoolWithCrop = (poolId, addedQuantityQuintals) => {
    setPools((prevPools) =>
      prevPools.map((pool) => {
        if (pool.id === poolId) {
          const updatedVolume = pool.currentPooled + Number(addedQuantityQuintals);
          return {
            ...pool,
            currentPooled: updatedVolume,
            participatingFarmersCount: pool.participatingFarmersCount + 1
          };
        }
        return pool;
      })
    );
    showNotification(`Successfully joined pool with ${addedQuantityQuintals} Quintals! Total bulk volume updated.`, 'success');
  };

  const createNewPoolGroup = (poolData) => {
    const newPool = {
      ...poolData,
      id: 'p_' + Date.now(),
      currentPooled: Number(poolData.initialQuantity || 0),
      participatingFarmersCount: 1,
      buyerName: 'Open Wholesale Bidding',
      buyerStatus: 'Bids Opening Soon',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
    };
    setPools((prev) => [newPool, ...prev]);
    showNotification('New Kisan Collective Pool created! Nearby farmers can now join.', 'success');
  };

  return (
    <MarketContext.Provider
      value={{
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        crops,
        pools,
        equipment,
        mandiList,
        cart,
        addToCart,
        removeFromCart,
        addProduceListing,
        joinPoolWithCrop,
        createNewPoolGroup,
        toast,
        showNotification
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => useContext(MarketContext);
