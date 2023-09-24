import React from 'react'
import { DetailsHeader } from '../../components/header/detailsHeader'
import { Content } from '../../components/detailsInformation'
import styles from './style.module.css'
import CheckboxGroup from '../../components/detailSelection/sizeSelection'
import ToppingSelection from '../../components/detailSelection/toppingsSelector'
import SideSelection from '../../components/detailSelection/sizeSelection'
// import PricingBox from '../../components/detailSelection/total/index'

export const Details = () => {
  return (
    <div className={styles.detailsHeader}>
    <DetailsHeader/>
    <div className={styles.detail}></div>
    <Content/>
    <CheckboxGroup/>
    <ToppingSelection/>
    <SideSelection/>
    </div>
    
  )
}
