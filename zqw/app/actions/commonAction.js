import *as types from '../constants/commonTypes';

const setBatch = (batch) => ({ 
	type: types.SETBATCH, 
	batch: batch 
});

const setIndex = (index) => ({ 
	type: types.SETINDEX, 
	index: index 
});

const setData = (data) => ({
  type: types.SETDATA,
  data: data
});

const setReplace = (info)=>({
  type: types.SETREPLACE,
  info: info
})

export {
    setBatch,
    setIndex,
    setData,
    setReplace
}
