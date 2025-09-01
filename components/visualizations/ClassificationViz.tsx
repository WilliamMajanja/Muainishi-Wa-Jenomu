

import React from 'react';
import { ClassificationData } from '../../types';
import { VizContainer } from './VizContainer';
import { MaleIcon } from '../icons/MaleIcon';
import { FemaleIcon } from '../icons/FemaleIcon';

// A simple hook to create SVG path for a pie chart slice
const getArcPath = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = {
        x: x + radius * Math.cos(startAngle),
        y: y + radius * Math.sin(startAngle)
    };
    const end = {
        x: x + radius * Math.cos(endAngle),
        y: y + radius * Math.sin(endAngle)
    };
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    // Add a tiny epsilon to the end angle if it's a full circle to prevent the arc from disappearing
    if (endAngle - startAngle >= 2 * Math.PI - 0.001) {
      return `M ${start.x} ${start.y} A ${radius} ${radius} 1 1 1 ${end.x - 0.01} ${end.y} Z`;
    }
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} L ${x} ${y} Z`;
};

// Use the new theme colors for the chart
const chartColors = [
    '#38bdf8', // brand-blue
    '#8b5cf6', // brand-purple
    '#10b981', // brand-green
    '#f97316', // brand-orange
    '#f59e0b', // brand-gold
    '#ec4899', // A pink for more variety
];

export const ClassificationViz: React.FC<{ data: ClassificationData }> = ({ data }) => {
    let cumulativePercent = 0;
    const totalPercent = data.ancestry.reduce((sum, item) => sum + item.percentage, 0) || 100;
    
    const paternalHaplogroup = data.haplogroups.find(h => h.type === 'Paternal');
    const maternalHaplogroup = data.haplogroups.find(h => h.type === 'Maternal');

    return (
      <VizContainer title="Genetic Ancestry & Haplogroups" summary={data.summary}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3">
                <h4 className="font-bold text-lg text-brand-light mb-4 text-center">Ancestry Composition</h4>
                 <svg viewBox="0 0 100 100" className="w-full max-w-[250px] mx-auto drop-shadow-lg">
                    {data.ancestry.map((item, index) => {
                        const percent = item.percentage / totalPercent;
                        const startAngle = cumulativePercent * 2 * Math.PI - Math.PI / 2;
                        const endAngle = (cumulativePercent + percent) * 2 * Math.PI - Math.PI / 2;
                        cumulativePercent += percent;
                        return (
                            <path
                                key={item.region}
                                d={getArcPath(50, 50, 45, startAngle, endAngle)}
                                fill={chartColors[index % chartColors.length]}
                            />
                        );
                    })}
                     <circle cx="50" cy="50" r="25" fill="#1e293b" />
                     <text x="50" y="52" textAnchor="middle" dominantBaseline="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">Ancestry</text>
                </svg>
                 <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
                    {data.ancestry.map((item, index) => (
                        <li key={item.region} className="flex items-center text-sm">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: chartColors[index % chartColors.length] }}></span>
                            <span>{item.region}: {item.percentage.toFixed(2)}%</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="lg:col-span-2">
                <h4 className="font-bold text-lg text-brand-light mb-4 text-center">Key Lineages</h4>
                <div className="space-y-4">
                    {maternalHaplogroup && (
                        <div className="p-4 bg-brand-secondary rounded-lg border border-brand-accent/50 flex items-center gap-4">
                            <div className="p-3 bg-brand-primary rounded-full">
                                <FemaleIcon className="w-6 h-6 text-brand-purple" />
                            </div>
                            <div>
                                <p className="text-sm text-brand-light">Maternal Haplogroup</p>
                                <p className="font-mono text-xl font-bold text-brand-text">{maternalHaplogroup.group}</p>
                            </div>
                        </div>
                    )}
                     {paternalHaplogroup && (
                        <div className="p-4 bg-brand-secondary rounded-lg border border-brand-accent/50 flex items-center gap-4">
                            <div className="p-3 bg-brand-primary rounded-full">
                                <MaleIcon className="w-6 h-6 text-brand-blue" />
                            </div>
                            <div>
                                <p className="text-sm text-brand-light">Paternal Haplogroup</p>
                                <p className="font-mono text-xl font-bold text-brand-text">{paternalHaplogroup.group}</p>
                            </div>
                        </div>
                    )}
                    {data.haplogroups.length === 0 && (
                        <p className="text-center text-brand-light">No haplogroup data available.</p>
                    )}
                </div>
            </div>
        </div>
      </VizContainer>
    );
};
