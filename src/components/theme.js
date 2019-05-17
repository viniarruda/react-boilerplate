const colors = {
  primary: '#7159c1',
  secondary: '#9b49c1',
  default: '#fff',
  gradient: 'linear-gradient(112deg, rgba(113,89,193,1) 0%, rgba(155,73,193,1) 100%);',
  bg: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);'
}

const viewports = {
  smartphone: '360px',
  tablet: '720px',
  desktop: '1280px'
}

const forms = {
  labelColor: colors.light,
  errorColor: colors.danger
};

const theme = Object.freeze({
  colors,
  forms,
  viewports
});

export default theme;