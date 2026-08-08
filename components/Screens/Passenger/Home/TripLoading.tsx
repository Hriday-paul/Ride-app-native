import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';

function RideHistoryCardSkeleton() {
    return (
        <View
            style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 16,
                padding: 16,
            }}
        >
            <SkeletonPlaceholder borderRadius={4} backgroundColor="#E5E7EB" highlightColor="#F3F4F6">
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start" justifyContent="space-between">
                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start" flex={1}>
                        <SkeletonPlaceholder.Item width={40} height={40} borderRadius={20} marginRight={10} />
                        <SkeletonPlaceholder.Item flex={1}>
                            <SkeletonPlaceholder.Item width="70%" height={14} borderRadius={4} />
                            <SkeletonPlaceholder.Item width="40%" height={12} borderRadius={4} marginTop={8} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>

                    <SkeletonPlaceholder.Item width={70} height={22} borderRadius={8} />
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item marginTop={16} paddingLeft={4}>
                    {/* Pickup row */}
                    <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item alignItems="center" marginRight={12} width={10}>
                            <SkeletonPlaceholder.Item width={8} height={8} borderRadius={4} />
                            <SkeletonPlaceholder.Item width={1} height={30} marginTop={4} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flex={1} paddingBottom={16}>
                            <SkeletonPlaceholder.Item width="20%" height={10} borderRadius={4} />
                            <SkeletonPlaceholder.Item width="85%" height={13} borderRadius={4} marginTop={6} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>

                    {/* Drop row */}
                    <SkeletonPlaceholder.Item flexDirection="row">
                        <SkeletonPlaceholder.Item alignItems="center" marginRight={12} width={10}>
                            <SkeletonPlaceholder.Item width={8} height={8} borderRadius={4} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flex={1}>
                            <SkeletonPlaceholder.Item width="20%" height={10} borderRadius={4} />
                            <SkeletonPlaceholder.Item width="75%" height={13} borderRadius={4} marginTop={6} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    );
}

export default RideHistoryCardSkeleton;