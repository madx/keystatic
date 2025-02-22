import { ReactNode } from 'react';
import { Element } from 'slate';
import { RenderElementProps } from 'slate-react';

import { ActionButton } from '@keystar/ui/button';
import { Icon } from '@keystar/ui/icon';
import { trashIcon } from '@keystar/ui/icon/icons/trashIcon';
import { Tooltip, TooltipTrigger } from '@keystar/ui/tooltip';

import { BlockPopover, BlockPopoverTrigger } from '../primitives';

import {
  ComponentBlock,
  PreviewPropsForToolbar,
  ObjectField,
  ComponentSchema,
} from '../../../../api';
import { blockElementSpacing } from '../ui-utils';

export function ChromelessComponentBlockElement(props: {
  renderedBlock: ReactNode;
  componentBlock: ComponentBlock & { chromeless: true };
  previewProps: PreviewPropsForToolbar<
    ObjectField<Record<string, ComponentSchema>>
  >;
  onRemove: () => void;
  attributes: RenderElementProps['attributes'];
  element: Element;
}) {
  const ChromelessToolbar =
    props.componentBlock.toolbar ?? DefaultToolbarWithoutChrome;

  return (
    <div {...props.attributes} className={blockElementSpacing}>
      <BlockPopoverTrigger element={props.element}>
        <div>{props.renderedBlock}</div>
        <BlockPopover>
          <ChromelessToolbar
            onRemove={props.onRemove}
            props={props.previewProps}
          />
        </BlockPopover>
      </BlockPopoverTrigger>
    </div>
  );
}

function DefaultToolbarWithoutChrome({
  onRemove,
}: {
  onRemove(): void;
  props: Record<string, any>;
}) {
  return (
    <TooltipTrigger>
      <ActionButton onPress={onRemove} margin="regular">
        <Icon src={trashIcon} />
      </ActionButton>
      <Tooltip tone="critical">Remove</Tooltip>
    </TooltipTrigger>
  );
}
