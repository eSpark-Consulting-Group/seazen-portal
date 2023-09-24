import React from 'react'
import ProfileHeader from '../../components/header/profileHeader'
import { Footer } from '../../components/footer/footerContent'
import styles from "./style.module.css"

export const PrivacyPolicy = () => {
  return (
    <div>
        <ProfileHeader showFlagOption={false} />
        <div className={styles.privacyPolicySection}>
            <h1>Privacy Policy</h1>
            <p className={styles.privacyParagraphTitle}>1. Lorem ipsum </p>
            <p className={styles.privacyParagraphOne}>dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. </p>
            <p className={styles.privacyParagraphTwo}>Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. </p>
            <p className={styles.privacyParagraphTitleTwo}>2. Lorem ipsum </p>
            <p className={styles.privacyParagraphThree}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
        </div>
        <div className={styles.privacyPolicyFooter}>
        <Footer showCommentOption={false} />
        </div>
    </div>
  )
}
