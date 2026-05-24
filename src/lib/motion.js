export const pageTransition = (isMobile) => ({
  initial: { opacity: 0, y: isMobile ? 0 : 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: 'easeOut' },
})

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const cardVariants = (isMobile) => ({
  hidden: { opacity: 0, y: isMobile ? 0 : 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
})

export const rowVariants = (isMobile) => ({
  hidden: { opacity: 0, x: isMobile ? 0 : -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: 'easeOut' },
  }),
})

export const feedRowVariants = (isMobile) => ({
  hidden: { opacity: 0, y: isMobile ? 0 : 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: 'easeOut' },
  }),
})

export const listContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export const modalOverlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: 'easeIn' },
}

export const modalCardVariants = (isMobile) => ({
  initial: { opacity: 0, scale: isMobile ? 1 : 0.95, y: isMobile ? 0 : 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: isMobile ? 1 : 0.95, y: isMobile ? 0 : 16 },
  transition: { duration: 0.2, ease: 'easeOut' },
})

export const pillVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2, delay: 0.1, ease: 'easeOut' },
}
