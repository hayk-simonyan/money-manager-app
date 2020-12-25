import React from 'react';

import {
  IonCard,
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
  IonSkeletonText,
} from '@ionic/react';

export default function AccountsSkeleton() {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size='6'>
          <IonCard style={{ margin: '6px 9px' }}>
            <IonItem lines='none' button>
              <IonGrid>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '70%' }} />
                </IonRow>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '50%' }} />
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonCard>
        </IonCol>
        <IonCol size='6'>
          <IonCard style={{ margin: '6px 9px' }}>
            <IonItem lines='none' button>
              <IonGrid>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '70%' }} />
                </IonRow>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '50%' }} />
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonCard>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size='6'>
          <IonCard style={{ margin: '6px 9px' }}>
            <IonItem lines='none' button>
              <IonGrid>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '70%' }} />
                </IonRow>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '50%' }} />
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonCard>
        </IonCol>
        <IonCol size='6'>
          <IonCard style={{ margin: '6px 9px' }}>
            <IonItem lines='none' button>
              <IonGrid>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '70%' }} />
                </IonRow>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '50%' }} />
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonCard>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size='6'>
          <IonCard style={{ margin: '6px 9px' }}>
            <IonItem lines='none' button>
              <IonGrid>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '70%' }} />
                </IonRow>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '50%' }} />
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonCard>
        </IonCol>
        <IonCol size='6'>
          <IonCard style={{ margin: '6px 9px' }}>
            <IonItem lines='none' button>
              <IonGrid>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '70%' }} />
                </IonRow>
                <IonRow>
                  <IonSkeletonText animated style={{ width: '50%' }} />
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
