import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const MinecraftStatus = () => {
  const [serverData, setServerData] = useState(null);
  const SERVER_IP = 'mc.neotec.uk';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await response.json();
        setServerData(data);
      } catch (error) {
        console.error('API请求失败:', error);
      }
    };

    // 初始加载
    fetchData();
    
    // 每60秒刷新一次
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h2>服务器状态</h2>
      <div className={styles.statusBox}>
        <div 
          className={`${styles.statusIndicator} ${
            serverData?.online ? styles.online : styles.offline
          }`}
        />
        <div className={styles.details}>
          <p>地址: <span>{serverData?.hostname || '-'}</span></p>
          <p>版本: <span>{serverData?.version || '-'}</span></p>
          <p>玩家: <span>
            {serverData?.players ? `${serverData.players.online}/${serverData.players.max}` : '-'}
          </span></p>
          <p>描述: <span>
            {serverData?.motd?.clean?.join(' ') || '服务器当前离线'}
          </span></p>
        </div>
        {serverData?.icon && (
          <img 
            src={serverData.icon} 
            alt="服务器图标"
            style={{ width: '64px' }}
          />
        )}
      </div>
    </div>
  );
};

export default MinecraftStatus;
