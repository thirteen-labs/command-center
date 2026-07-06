import {
  Folder, Setting, Cpu, Global, Box, TextalignLeft, Lock,
  ExternalDrive, ArchiveBox, Box1,
  Command, Setting2, Data, Monitor, Edit, RowVertical,
  Export, Code, Profile2User, Clock, Key, DocumentText, Apple,
  Mobile, CloseCircle, Filter, SearchNormal1, Star,
  DocumentCopy, ArrowRight, ExportSquare, Link,
  Hierarchy3, CommandSquare, Element,
  type Icon as IconType,
} from 'iconsax-react-nativejs';

const iconMap: Record<string, IconType> = {
  folder: Folder,
  gear: Setting,
  cpu: Cpu,
  network: Global,
  shippingbox: Box,
  'text.alignleft': TextalignLeft,
  lock: Lock,
  externaldrive: ExternalDrive,
  archivebox: ArchiveBox,
  'arrow.triangle.branch': Hierarchy3,
  cube: Box1,
  terminal: Command,
  hammer: Setting2,
  'cylinder.split.1x2': Data,
  'server.rack': Monitor,
  'square.and.pencil': Edit,
  'rectangle.split.2x1': RowVertical,
  'arrow.up.doc': Export,
  variable: Code,
  'person.2': Profile2User,
  clock: Clock,
  wrench: Setting2,
  'key.fill': Key,
  'doc.text.magnifyingglass': DocumentText,
  nose: Code,
  'terminal.fill': Command,
  command: CommandSquare,
  'iphone.gen3': Mobile,
  'apple.logo': Apple,
  desktopcomputer: Monitor,
  magnifyingglass: SearchNormal1,
  'xmark.circle.fill': CloseCircle,
  'line.3.horizontal.decrease': Filter,
  'star.fill': Star,
  star: Star,
  'doc.on.doc': DocumentCopy,
  'chevron.right': ArrowRight,
  chevron_right: ArrowRight,
  'arrow.up.right.square': ExportSquare,
  link: Link,
};

interface Props {
  name: string;
  size?: number;
  color?: string;
  variant?: 'Linear' | 'Outline' | 'Broken' | 'Bold' | 'Bulk' | 'TwoTone';
}

export function Icon({ name, size = 24, color = 'currentColor', variant = 'Linear' }: Props) {
  const C = iconMap[name] || Element;
  return <C size={size} color={color} variant={variant} />;
}
