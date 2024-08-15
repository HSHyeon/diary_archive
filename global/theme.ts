const colors = {
    // ${({ theme }) => theme.colors.컬러이름};
    main: "#fff",
    sub: "#815F50",
    point: "#EC4194",
    textPrimary: "#212121",
    textSecondary: "#666666",
    textDisable: "#9e9e9e",
    background: "#FFFCF8",
    deepback: "#f9f1e9",
    highlight: "#FFC469",
    contextBorder: "#b4b4b4",
  };
  
  const size = {
    maxWidth: 768,
    sm: 12,
    rg: 14,
    md: 16,
    lg: 20,
  };
  
  export const constants = {
    size,
  };
  
  export const defaultTheme = {
    colors,
  };
  
  export const theme = {
    ...constants,
    ...defaultTheme,
  };