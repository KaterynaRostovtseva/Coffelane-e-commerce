import { typography } from '../../theme/typography.js';

export const cartStyles = {
  // Colors
  primaryText: '#3E3027',
  primaryButton: '#3E3027',
  primaryButtonHover: '#2a2118',
  dividerColor: '#3E3027',

  // Spacing
  modalWidth: '500px',
  itemHeight: '160px',
  imageSize: '160px',
  buttonSize: '24px',
  modalPadding: '32px',
  itemSpacing: '24px',
  contentGap: '16px',
  
  // Layout
  itemContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    height: '160px',
    gap: 2,
    mb: 3
  },
  
  imageContainer: {
    width: '160px',
    height: '160px',
    maxWidth: '160px',
    maxHeight: '160px',
    minWidth: '160px',
    minHeight: '160px',
    objectFit: 'contain',
    flexShrink: 0,
    borderRadius: '24px'
  },
  
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    ml: 2,
    justifyContent: 'space-between',
    height: '100%'
  },
  
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 3
  },
  
  productFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1.5
  },
  
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  
  deleteButton: {
    color: '#3E3027',
    padding: 0,
    minWidth: 'auto',
    width: '24px',
    height: '24px',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:active': {
      transform: 'scale(0.95)'
    }
  },
  
  quantityButton: {
    backgroundColor: '#3E3027',
    color: '#fff',
    width: 24,
    height: 24,
    '&:hover': {
      backgroundColor: '#2a2118'
    }
  },
  
  deleteIcon: {
    width: '24px',
    height: '24px',
    filter: 'brightness(0) saturate(100%) invert(20%) sepia(8%) saturate(1200%) hue-rotate(25deg) brightness(95%) contrast(90%)'
  },
  
  // Typography
  textStyles: {
    productName: { 
      ...typography.h5, 
      color: '#3E3027', 
      flex: 1, 
      wordWrap: 'break-word' 
    },
    price: { 
      ...typography.h5, 
      color: '#3E3027' 
    },
    quantity: { 
      ...typography.h5, 
      color: '#3E3027', 
      minWidth: '20px', 
      textAlign: 'center' 
    },
    orderSummary: {
      ...typography.h5, 
      color: '#3E3027', 
      p: 0, 
      m: 0
    }
  },
  
  // Modal styles
  modalContainer: {
    '& .MuiDialog-paper': {
      width: '500px', 
      maxWidth: '500px'
    }
  },
  
  dialogContent: {
    height: '100vh', 
    display: 'flex', 
    flexDirection: 'column', 
    padding: 0
  },
  
  cartHeader: {
    textAlign: 'center', 
    mt: '56px', 
    mx: '32px', 
    mb: '32px'
  },
  
  cartContent: {
    flex: 1, 
    overflow: 'auto', 
    display: 'flex', 
    flexDirection: 'column'
  },
  
  itemsContainer: {
    mx: '32px', 
    flex: 1
  },
  
  orderSummaryContainer: {
    borderTop: 1, 
    borderColor: '#3E3027', 
    mt: 2, 
    mx: '32px', 
    mb: '56px'
  },
  
  orderSummary: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    p: 0, 
    my: 2
  },
  
  orderSummaryRow: {
    display: 'flex', 
    justifyContent: 'space-between', 
    p: 0, 
    m: 0, 
    pb: 2.5
  },
  
  orderSummaryRowLast: {
    display: 'flex', 
    justifyContent: 'space-between', 
    p: 0, 
    m: 0
  },
  
  checkoutButton: {
    mt: 2
  }
};
