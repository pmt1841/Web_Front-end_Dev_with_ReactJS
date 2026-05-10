// src/components/Category/utils/DynamicIcon.tsx

import React from 'react';
import * as Icons from '@mui/icons-material';

interface DynamicIconProps {
    name: string;
    color?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, color }) => {
    const IconComponent = (Icons[name as keyof typeof Icons] as React.ElementType) || Icons.Category;
    return <IconComponent sx={{ color: color }} />;
};

export default DynamicIcon;