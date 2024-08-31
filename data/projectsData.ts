interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'A Bitcoin Wallet Implementation from Scratch',
    description: `This project aims to implement Bitcoin-related algorithms from scratch, allowing the creation of a Bitcoin wallet on an embedded device without relying on any third-party libraries.`,
    imgSrc: '/static/images/bitcoin.png',
    href: 'https://github.com/yhyuan/bitcoin-rust-lib',
  },
]

export default projectsData
