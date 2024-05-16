import {
  Camera,
  Loader,
  PlusIcon,
  MoreHorizontal,
  PalmtreeIcon,
  HelpingHandIcon,
  ClipboardEdit,
  Clock,
  Settings,
  Edit2,
  FileText,
  Github,
  ListTodo,
  User,
  ArrowLeft,
  Move,
  Star,
  Trash2,
  ArrowRightCircle,
  Ban,
  CheckCircle2,
  Eye,
  XCircle,
  Info,
  Folder,
  PencilIcon,
  SortDesc,
  SortAsc,
  ChevronRight,
  ChevronDown,
  Menu,
  Component,
  EyeOff,
  Library,
  Filter,
  MinusIcon,
  Upload,
  ClipboardList,
  Maximize,
  CalendarDays,
  Bell,
  Lock,
  Building2,
  Cog,
} from 'lucide-react';
import React from 'react';

export const Icons = {
  Lock,
  Camera,
  Clock,
  Loader,
  PlusIcon,
  MoreHorizontal,
  PalmtreeIcon,
  HelpingHandIcon,
  ClipboardEdit,
  Settings,
  Edit2,
  FileText,
  Github,
  ListTodo,
  User,
  ArrowLeft,
  Move,
  Star,
  Trash2,
  ArrowRightCircle,
  Ban,
  CheckCircle2,
  Eye,
  XCircle,
  Info,
  Folder,
  PencilIcon,
  SortDesc,
  SortAsc,
  ChevronRight,
  ChevronDown,
  Menu,
  Component,
  EyeOff,
  Library,
  Filter,
  MinusIcon,
  Upload,
  ClipboardList,
  Maximize,
  CalendarDays,
  Bell,
  Building2,
  Cog,
};

export const ClickOutIcon = ({ size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-square-arrow-out-up-right text-gray-500"
    >
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
      <path d="m21 3-9 9" />
      <path d="M15 3h6v6" />
    </svg>
  );
};
