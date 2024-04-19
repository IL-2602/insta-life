export const mockPhotoData: Photo[] = [
  {
    id: '1',
    url: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1308881.jpg&fm=jpg',
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-733872.jpg&fm=jpg',
  },
]

export type Photo = {
  id: string
  url: string
}
