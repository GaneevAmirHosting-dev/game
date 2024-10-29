


closeALlWindows()


function inventoryOpen() {
      closeALlWindows()
      document.querySelector(".inventoryWin").style.display = 'grid';
  }
  
  function workbenchOpen() {
      closeALlWindows();
      document.querySelector(".workbenchWin").style.display = 'grid';
  }
  
  function mapOpen() {
      closeALlWindows();
      document.querySelector(".mapWin").style.display = 'grid';
  }
  
  function digOpen() {
      closeALlWindows(); 
      document.querySelector(".digWin").style.display = 'grid';
  }
  
  function settingsOpen() {
      closeALlWindows(); 
      document.querySelector(".settingsWin").style.display = 'grid';
  }
  
  function closeALlWindows() {
      document.querySelector(".inventoryWin").style.display = 'none';
      document.querySelector(".workbenchWin").style.display = 'none';  
      document.querySelector(".mapWin").style.display = 'none';
      document.querySelector(".digWin").style.display = 'none';  
      document.querySelector(".settingsWin").style.display = 'none';
  }