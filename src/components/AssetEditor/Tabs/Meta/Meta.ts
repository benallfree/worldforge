import { div, p } from '../../../../van'
import { DescriptionEditor } from './DescriptionEditor'
import { TitleEditor } from './TitleEditor'

export type MetaProps = {}
export const DefaultMetaProps: MetaProps = {}
export const Meta = (props?: Partial<MetaProps>) => {
  const {} = { ...DefaultMetaProps, ...props }

  return div({}, p(`Title`), TitleEditor(), p(`Description`), DescriptionEditor())
}
