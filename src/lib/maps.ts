/** Ссылка на поиск адреса в Яндекс Картах — открывается и в приложении, и в браузере. */
export function mapUrl(address: string): string {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
}
