import { memo } from 'react'

import { Table } from '@/shared/ui/Table'
import { MyPaymentsProps } from '@/widgets/profile/profileSettings/ui/myPayments/container'
import { paymentsValidity } from '@/widgets/profile/profileSettings/ui/myPayments/utils/paymentsValidity'

import s from './MyPayments.module.scss'

export const MyPayments = memo(({ myPayments }: MyPaymentsProps) => {
  return (
    <div className={s.container}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Date of Payment</Table.HeadCell>
            <Table.HeadCell>End date of subscription</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Subscription Type</Table.HeadCell>
            <Table.HeadCell>Payment Type</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {myPayments &&
            myPayments.map(el => {
              return (
                <Table.Row key={el.subscriptionId}>
                  <Table.Cell>{new Date(el.dateOfPayment).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{new Date(el.endDateOfSubscription).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>${el.price}</Table.Cell>
                  <Table.Cell>{paymentsValidity(el.subscriptionType)}</Table.Cell>
                  <Table.Cell>{el.paymentType}</Table.Cell>
                </Table.Row>
              )
            })}
        </Table.Body>
      </Table.Root>
    </div>
  )
})
