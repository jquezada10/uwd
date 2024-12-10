'use client';
import LinearProgress from '@mui/material/LinearProgress';

export default function LoadingData({isPending}: {isPending: boolean}){
  if(isPending){
    return(<LinearProgress />)
  }else{

  }
}