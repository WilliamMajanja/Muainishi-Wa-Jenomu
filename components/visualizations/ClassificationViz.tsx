import React from 'react';
import { ClassificationData } from '../../types';
import { VizContainer } from './VizContainer';

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

    return (
      <VizContainer title="Genetic Ancestry & Haplogroups" summary={data.summary}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                <h4 className="font-bold text-brand-light mb-4 text-center">Ancestry Composition</h4>
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
                </svg>
                 <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
                    {data.ancestry.map((item, index) => (
                        <li key={item.region} className="flex items-center text-sm">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: chartColors[index % chartColors.length] }}></span>
                            <span>{item.region}: {item.percentage.toFixed(2)}%</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-brand-light mb-4">Haplogroups</h4>
                <ul className="space-y-3">
                    {data.haplogroups.map(hg => (
                        <li key={hg.group} className="p-3 bg-brand-secondary rounded-md border border-brand-accent/50">
                            <span className={`font-bold ${hg.type === 'Maternal' ? 'text-brand-purple' : 'text-brand-blue'}`}>{hg.type}: </span>
                            <span className="font-mono text-brand-text">{hg.group}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </VizContainer>
    );
};