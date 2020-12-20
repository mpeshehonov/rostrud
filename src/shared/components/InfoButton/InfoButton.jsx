import React, {useState} from 'react';
import './styles.scss';
import {Modal, Button} from 'antd';

const InfoButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
    <Button type="link" onClick={showModal}>
      Источники данных
    </Button>
    <Modal title="Источники данных" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      Обезличенные сведения об отдельных характеристиках получателей государственной услуги содействия гражданам в поиске подходящей работы, а работодателям в подборе необходимых работников",
      и обезличенные сведения об отдельных характеристиках граждан, обратившихся в электронной форме за пособием по безработице в период с 9 апреля по 31 октября 2020 года".
      Источник: Роструд; обработка: Роструд, Инфраструктура научно-исследовательских данных, АНО «ЦПУР», 2020. (набор данных получен в рамках хакатона PandemicDataHack, 18-20 декабря 2020).
    </Modal>
    </>
  )
}

export default InfoButton;
  